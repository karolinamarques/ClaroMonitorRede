import axios from 'axios';
import { 
    createTicket, 
    getTickets, 
    updateTicket, 
    getMetrics 
} from '../src/api';

jest.mock('axios');

describe('API Service Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('createTicket faz POST com dados corretos', async () => {
        const mockData = { titulo: 'Teste', descricao: 'Descrição teste' };
        const mockResponse = { data: { id: 1, ...mockData } };
        axios.post.mockResolvedValue(mockResponse);

        const result = await createTicket(mockData);
        
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3000/tickets',
            mockData
        );
        expect(result).toEqual(mockResponse.data);
    });

    test('createTicket trata erro corretamente', async () => {
        const errorMessage = 'Network Error';
        axios.post.mockRejectedValue(new Error(errorMessage));
        
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await expect(createTicket({})).rejects.toThrow();
        expect(consoleSpy).toHaveBeenCalledWith(
            'Erro ao criar ticket:',
            expect.any(Error)
        );
        
        consoleSpy.mockRestore();
    });

    test('getTickets retorna lista de tickets', async () => {
        const mockTickets = [{ id: 1, titulo: 'Ticket 1' }];
        axios.get.mockResolvedValue({ data: mockTickets });

        const result = await getTickets();
        
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/tickets');
        expect(result).toEqual(mockTickets);
    });

    test('updateTicket faz PUT com ID correto', async () => {
        const mockUpdate = { status: 'fechado' };
        const mockResponse = { data: { id: 1, ...mockUpdate } };
        axios.put.mockResolvedValue(mockResponse);

        const result = await updateTicket(1, mockUpdate);
        
        expect(axios.put).toHaveBeenCalledWith(
            'http://localhost:3000/tickets/1',
            mockUpdate
        );
        expect(result).toEqual(mockResponse.data);
    });

    test('getMetrics retorna métricas corretas', async () => {
        const mockMetrics = { abertos: 5, fechados: 3 };
        axios.get.mockResolvedValue({ data: mockMetrics });

        const result = await getMetrics();
        
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/metrics');
        expect(result).toEqual(mockMetrics);
    });
});
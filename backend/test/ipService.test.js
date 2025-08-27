const axios = require('axios');
const { getClientIP } = require('../services/ipService');

jest.mock('axios');

describe('IP Service Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar o IP do cliente quando a chamada for bem-sucedida', async () => {
        const mockIP = '192.168.0.1';
        axios.get.mockResolvedValue({ data: { ip: mockIP } });

        const result = await getClientIP();
        
        expect(result).toBe(mockIP);
        expect(axios.get).toHaveBeenCalledWith('https://api.ipify.org?format=json');
    });

    it('deve retornar null e logar erro quando a chamada falhar', async () => {
        const errorMessage = 'Network Error';
        axios.get.mockRejectedValue(new Error(errorMessage));
        
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        const result = await getClientIP();
        
        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify({
            level: 'error',
            message: 'Erro ao capturar IP do cliente',
            error: errorMessage
        }));
        
        consoleSpy.mockRestore();
    });
});
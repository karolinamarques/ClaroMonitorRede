const request = require('supertest');
const app = require('../server');
const { Ticket } = require('../models/ticket');
const axios = require('axios');

jest.mock('../models/ticket');
jest.mock('axios');

describe('Tickets API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /tickets', () => {
        it('deve criar um novo ticket com IP do cliente', async () => {
            const mockTicket = {
                id: 1,
                titulo: 'Problema de rede',
                descricao: 'Internet lenta',
                status: 'aberto',
                data_abertura: new Date(),
                ip_cliente: '189.210.155.66'
            };

            axios.get.mockResolvedValue({ data: { ip: '189.210.155.66' } });
            Ticket.create.mockResolvedValue(mockTicket);

            const res = await request(app)
                .post('/tickets')
                .send({ titulo: 'Problema de rede', descricao: 'Internet lenta' });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual(mockTicket);
            expect(Ticket.create).toHaveBeenCalledWith(expect.objectContaining({
                titulo: 'Problema de rede',
                descricao: 'Internet lenta',
                status: 'aberto',
                ip_cliente: '189.210.155.66'
            }));
        });

        it('deve retornar erro 500 em falha de criação', async () => {
            axios.get.mockResolvedValue({ data: { ip: '189.210.155.66' } });
            Ticket.create.mockRejectedValue(new Error('DB error'));

            const res = await request(app)
                .post('/tickets')
                .send({ titulo: 'Erro teste', descricao: 'Descrição teste' });

            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({ message: 'Erro ao criar ticket' });
        });
    });

    describe('GET /tickets', () => {
        it('deve listar todos os tickets', async () => {
            const mockTickets = [
                { id: 1, titulo: 'Ticket 1', status: 'aberto' },
                { id: 2, titulo: 'Ticket 2', status: 'fechado' }
            ];

            Ticket.findAll.mockResolvedValue(mockTickets);

            const res = await request(app).get('/tickets');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockTickets);
            expect(Ticket.findAll).toHaveBeenCalledWith({ where: {} });
        });

        it('deve filtrar tickets por status', async () => {
            const mockTickets = [{ id: 1, titulo: 'Ticket 1', status: 'aberto' }];
            
            Ticket.findAll.mockResolvedValue(mockTickets);

            const res = await request(app)
                .get('/tickets')
                .query({ status: 'aberto' });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockTickets);
            expect(Ticket.findAll).toHaveBeenCalledWith({ where: { status: 'aberto' } });
        });
    });

    describe('PUT /tickets/:id', () => {
        it('deve fechar um ticket existente', async () => {
            const mockTicket = {
                id: 1,
                status: 'aberto',
                save: jest.fn().mockResolvedValue(true)
            };

            Ticket.findByPk.mockResolvedValue(mockTicket);

            const res = await request(app)
                .put('/tickets/1')
                .send();

            expect(res.statusCode).toEqual(200);
            expect(mockTicket.status).toEqual('fechado');
            expect(mockTicket.data_fechamento).toBeInstanceOf(Date);
            expect(mockTicket.save).toHaveBeenCalled();
        });

        it('deve retornar 404 para ticket inexistente', async () => {
            Ticket.findByPk.mockResolvedValue(null);

            const res = await request(app).put('/tickets/999');

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ message: 'Ticket não encontrado' });
        });
    });
});
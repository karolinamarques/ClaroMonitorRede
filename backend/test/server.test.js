const request = require('supertest');
const app = require('../server');

describe('Server Configuration Tests', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(3000, done);
    });

    afterAll((done) => {
        server.close(done);
    });

    test('GET / should return API status', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('API de Controle de Tickets');
    });

    test('POST /tickets should return 201 status', async () => {
        const response = await request(app)
            .post('/tickets')
            .send({ titulo: 'Teste', descricao: 'Descrição teste' });
        expect(response.statusCode).toBe(201);
    });

    test('GET /tickets should return empty array', async () => {
        const response = await request(app).get('/tickets');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });
});
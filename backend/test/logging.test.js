const request = require('supertest');
const app = require('../server');

describe('Logging Configuration Tests', () => {
    let server;
    let originalConsoleLog;
    let logOutput = [];

    beforeAll((done) => {
        originalConsoleLog = console.log;
        console.log = (message) => {
            logOutput.push(message);
        };
        server = app.listen(3000, done);
    });

    afterAll((done) => {
        console.log = originalConsoleLog;
        server.close(done);
    });

    beforeEach(() => {
        logOutput = [];
    });

    test('should log requests in JSON format', async () => {
        await request(app).get('/');
        
        const logEntry = logOutput.find(entry => 
            entry.includes('"message":"GET / HTTP/1.1"')
        );
        
        expect(logEntry).toBeDefined();
        expect(() => JSON.parse(logEntry)).not.toThrow();
        expect(JSON.parse(logEntry)).toHaveProperty('message');
    });
});
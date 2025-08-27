const { expect } = require('chai');
const sinon = require('sinon');
const { sequelize, testConnection } = require('../src/database');

describe('Testes de Conexão com o Banco de Dados', () => {
    let authenticateStub, consoleLogSpy, consoleErrorSpy, exitStub;

    beforeEach(() => {
        authenticateStub = sinon.stub(sequelize, 'authenticate');
        consoleLogSpy = sinon.spy(console, 'log');
        consoleErrorSpy = sinon.spy(console, 'error');
        exitStub = sinon.stub(process, 'exit');
    });

    afterEach(() => {
        sinon.restore();
    });

    test('Deve conectar ao banco de dados', async () => {
        authenticateStub.resolves();
        await testConnection();
        expect(consoleLogSpy.calledWith(JSON.stringify({
            level: 'info',
            message: 'Conexão com o banco de dados estabelecida com sucesso'
        }))).to.be.true;
    });

    test('Deve logar erro e encerrar processo em falha de conexão', async () => {
        const error = new Error('Connection failed');
        authenticateStub.rejects(error);
        await testConnection();
        expect(consoleErrorSpy.calledWith(JSON.stringify({
            level: 'error',
            message: 'Falha ao conectar ao banco de dados:',
            error: error.message
        }))).to.be.true;
        expect(exitStub.calledWith(1)).to.be.true;
    });
});
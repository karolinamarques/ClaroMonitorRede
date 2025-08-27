const { expect } = require('chai');
const Ticket = require('../models/ticket');
const sequelize = require('../database');

describe('Modelo Ticket', () => {
  before(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await Ticket.destroy({ truncate: true });
  });

  it('deve criar um ticket com atributos válidos', async () => {
    const ticket = await Ticket.create({
      titulo: 'Problema de Login',
      descricao: 'Não consigo acessar o sistema',
      ip_cliente: '192.168.1.1'
    });

    expect(ticket).to.have.property('id');
    expect(ticket.status).to.equal('aberto');
    expect(ticket.data_abertura).to.be.instanceOf(Date);
    expect(ticket.data_fechamento).to.be.null;
  });

  it('deve falhar ao criar ticket sem título', async () => {
    try {
      await Ticket.create({
        descricao: 'Descrição inválida',
        ip_cliente: '192.168.1.1'
      });
      throw new Error('Deveria ter lançado um erro');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('deve falhar com status inválido', async () => {
    try {
      await Ticket.create({
        titulo: 'Título',
        descricao: 'Descrição',
        status: 'invalid_status',
        ip_cliente: '192.168.1.1'
      });
      throw new Error('Deveria ter lançado um erro');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('deve definir data_abertura automaticamente', async () => {
    const ticket = await Ticket.create({
      titulo: 'Teste Data',
      descricao: 'Descrição',
      ip_cliente: '192.168.1.1'
    });
    
    expect(ticket.data_abertura).to.be.closeToTime(new Date(), 2);
  });

  it('deve permitir atualizar data_fechamento', async () => {
    const ticket = await Ticket.create({
      titulo: 'Ticket Fechável',
      descricao: 'Descrição',
      ip_cliente: '192.168.1.1'
    });
    
    await ticket.update({ 
      status: 'fechado',
      data_fechamento: new Date() 
    });
    
    expect(ticket.status).to.equal('fechado');
    expect(ticket.data_fechamento).to.be.instanceOf(Date);
  });
});
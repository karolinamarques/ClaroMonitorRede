const express = require('express');
const router = express.Router();
const { Ticket } = require('../models/ticket');
const { getClientIP } = require('../services/ipService');
const { validateTicket } = require('../middleware/validation');

/**
 * POST /tickets - Criar um novo ticket
 */
router.post('/', validateTicket, async (req, res) => {
    try {
        const { titulo, descricao } = req.body;
        const ip_cliente = await getClientIP() || req.ip;

        const newTicket = await Ticket.create({
            titulo,
            descricao,
            status: 'aberto',
            data_abertura: new Date(),
            ip_cliente
        });

        res.status(201).json(newTicket);
    } catch (error) {
        console.error(JSON.stringify({ 
            level: 'error', 
            message: 'Erro ao criar ticket', 
            error: error.message 
        }));
        res.status(500).json({ 
            message: 'Erro ao criar ticket',
            error: error.message 
        });
    }
});

/**
 * GET /tickets - Listar tickets com filtros opcionais
 */
router.get('/', async (req, res) => {
    try {
        const { status } = req.query;
        const where = {};
        
        if (status && ['aberto', 'fechado'].includes(status)) {
            where.status = status;
        }
        
        const tickets = await Ticket.findAll({ where });
        res.json(tickets);
    } catch (error) {
        console.error(JSON.stringify({ 
            level: 'error', 
            message: 'Erro ao listar tickets', 
            error: error.message 
        }));
        res.status(500).json({ 
            message: 'Erro ao listar tickets',
            error: error.message 
        });
    }
});

/**
 * PUT /tickets/:id - Atualizar status de um ticket
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket não encontrado' });
        }

        // Só permite fechar tickets que estão abertos
        if (ticket.status === 'aberto') {
            ticket.status = 'fechado';
            ticket.data_fechamento = new Date();
            await ticket.save();
        }

        res.json(ticket);
    } catch (error) {
        console.error(JSON.stringify({ 
            level: 'error', 
            message: 'Erro ao atualizar ticket', 
            error: error.message 
        }));
        res.status(500).json({ 
            message: 'Erro ao atualizar ticket',
            error: error.message 
        });
    }
});

/**
 * GET /tickets/:id - Obter um ticket específico
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket não encontrado' });
        }

        res.json(ticket);
    } catch (error) {
        console.error(JSON.stringify({ 
            level: 'error', 
            message: 'Erro ao buscar ticket', 
            error: error.message 
        }));
        res.status(500).json({ 
            message: 'Erro ao buscar ticket',
            error: error.message 
        });
    }
});

module.exports = router;
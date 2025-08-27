const express = require('express');
const router = express.Router();
const { Ticket } = require('../models/ticket');
const os = require('os');
const { Op } = require('sequelize');

/**
 * GET /metrics - Calcular métricas de tickets e sistema
 */
router.get('/', async (req, res) => {
    try {
        // Contagem de tickets por status
        const openTickets = await Ticket.count({ where: { status: 'aberto' } });
        const closedTickets = await Ticket.count({ where: { status: 'fechado' } });
        const totalTickets = openTickets + closedTickets;

        // Cálculo do tempo médio de resolução
        const closedTicketsData = await Ticket.findAll({
            where: {
                status: 'fechado',
                data_fechamento: { [Op.not]: null }
            },
            attributes: ['data_abertura', 'data_fechamento']
        });

        let totalResolutionTimeMs = 0;
        closedTicketsData.forEach(ticket => {
            const resolutionTime = new Date(ticket.data_fechamento) - new Date(ticket.data_abertura);
            totalResolutionTimeMs += resolutionTime;
        });

        // Tempo médio em milissegundos
        const averageResolutionTimeMs = closedTickets > 0 ? totalResolutionTimeMs / closedTickets : 0;
        // Convertendo para segundos para a API
        const averageResolutionTime = averageResolutionTimeMs / 1000;

        // Métricas técnicas (CPU/memória)
        const memoryUsage = process.memoryUsage();
        const systemInfo = {
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
            cpus: os.cpus(),
            loadAvg: os.loadavg(),
            uptime: os.uptime()
        };

        res.json({
            tickets: {
                total: totalTickets,
                openTickets,
                closedTickets,
                averageResolutionTime
            },
            system: {
                memory: {
                    total: systemInfo.totalMemory,
                    free: systemInfo.freeMemory,
                    used: systemInfo.totalMemory - systemInfo.freeMemory,
                    process: memoryUsage
                },
                cpu: {
                    cores: systemInfo.cpus.length,
                    model: systemInfo.cpus[0].model,
                    loadAvg: systemInfo.loadAvg
                },
                uptime: systemInfo.uptime
            }
        });
    } catch (error) {
        console.error(JSON.stringify({ 
            level: 'error', 
            message: 'Erro ao calcular métricas', 
            error: error.message 
        }));
        res.status(500).json({ 
            message: 'Erro ao calcular métricas',
            error: error.message 
        });
    }
});

module.exports = router;
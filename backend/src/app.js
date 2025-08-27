const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const ticketsRoutes = require('./routes/tickets');
const metricsRoutes = require('./routes/metrics');

const app = express();

// Middleware para CORS
app.use(cors());

// Middleware para logging em formato JSON
app.use(morgan('combined', {
    stream: {
        write: (message) => {
            console.log(JSON.stringify({ message }));
        }
    }
}));

// Middleware para parsear JSON
app.use(express.json());

// Rotas iniciais
app.get('/', (req, res) => {
    res.send('API de Controle de Tickets');
});

// Rotas de tickets
app.use('/tickets', ticketsRoutes);

// Rotas de métricas
app.use('/metrics', metricsRoutes);

module.exports = app;
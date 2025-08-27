const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuração do Sequelize com variáveis de ambiente
const sequelize = new Sequelize(
    process.env.DB_NAME || 'tickets_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

/**
 * Testa a conexão com o banco de dados
 */
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log(JSON.stringify({
            level: 'info',
            message: 'Conexão com o banco de dados estabelecida com sucesso'
        }));
        
        // Sincroniza os modelos com o banco de dados
        await sequelize.sync();
        console.log(JSON.stringify({
            level: 'info',
            message: 'Modelos sincronizados com o banco de dados'
        }));
    } catch (error) {
        console.error(JSON.stringify({
            level: 'error',
            message: 'Falha ao conectar ao banco de dados:',
            error: error.message
        }));
        process.exit(1);
    }
};

module.exports = { sequelize, testConnection };
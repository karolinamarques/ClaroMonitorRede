const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

/**
 * Modelo de Ticket para o banco de dados
 */
const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.ENUM('aberto', 'fechado'),
        allowNull: false,
        defaultValue: 'aberto'
    },
    data_abertura: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    data_fechamento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    ip_cliente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'tickets',
    timestamps: false,
});

module.exports = { Ticket };
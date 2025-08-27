const app = require('./app');
const { sequelize, testConnection } = require('./database');
const PORT = process.env.PORT || 3000;

// Testar conexão com o banco de dados
testConnection();

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(JSON.stringify({
        level: 'info',
        message: `Servidor rodando na porta ${PORT}`
    }));
});
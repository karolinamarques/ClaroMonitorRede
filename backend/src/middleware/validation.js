/**
 * Middleware para validação de dados de entrada
 */

/**
 * Valida os dados de um ticket
 */
const validateTicket = (req, res, next) => {
    const { titulo, descricao } = req.body;
    const errors = [];

    if (!titulo || titulo.trim() === '') {
        errors.push('O título é obrigatório');
    }

    if (!descricao || descricao.trim() === '') {
        errors.push('A descrição é obrigatória');
    }

    if (titulo && titulo.length > 100) {
        errors.push('O título deve ter no máximo 100 caracteres');
    }

    if (errors.length > 0) {
        return res.status(400).json({ 
            message: 'Dados inválidos',
            errors 
        });
    }

    next();
};

module.exports = {
    validateTicket
};
const axios = require('axios');

/**
 * Obtém o endereço IP do cliente usando a API ipify
 * @returns {Promise<string|null>} O endereço IP ou null em caso de erro
 */
const getClientIP = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error(JSON.stringify({
            level: 'error',
            message: 'Erro ao capturar IP do cliente',
            error: error.message
        }));
        return null;
    }
};

module.exports = { getClientIP };
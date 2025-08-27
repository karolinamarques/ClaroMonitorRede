import axios from 'axios';

// URL base da API - pode ser configurada via variável de ambiente
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Instância do axios com configurações padrão
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
    response => response,
    error => {
        console.error(JSON.stringify({
            level: 'error',
            message: 'Erro na requisição API',
            error: error.message,
            status: error.response?.status,
            data: error.response?.data
        }));
        return Promise.reject(error);
    }
);

/**
 * Cria um novo ticket
 * @param {Object} ticketData - Dados do ticket (titulo, descricao)
 * @returns {Promise} - Promise com os dados do ticket criado
 */
export const createTicket = async (ticketData) => {
    const response = await api.post('/tickets', ticketData);
    return response.data;
};

/**
 * Obtém a lista de tickets
 * @param {Object} params - Parâmetros de filtro (status)
 * @returns {Promise} - Promise com a lista de tickets
 */
export const getTickets = async (params = {}) => {
    const response = await api.get('/tickets', { params });
    return response.data;
};

/**
 * Atualiza um ticket
 * @param {number} id - ID do ticket
 * @param {Object} ticketData - Dados para atualização
 * @returns {Promise} - Promise com os dados do ticket atualizado
 */
export const updateTicket = async (id, ticketData) => {
    const response = await api.put(`/tickets/${id}`, ticketData);
    return response.data;
};

/**
 * Obtém um ticket específico
 * @param {number} id - ID do ticket
 * @returns {Promise} - Promise com os dados do ticket
 */
export const getTicket = async (id) => {
    const response = await api.get(`/tickets/${id}`);
    return response.data;
};

/**
 * Obtém as métricas do sistema
 * @returns {Promise} - Promise com as métricas
 */
export const getMetrics = async () => {
    const response = await api.get('/metrics');
    return response.data;
};

export default api;
-- Criação da tabela de tickets
CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('aberto', 'fechado')),
    data_abertura TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_fechamento TIMESTAMP,
    ip_cliente VARCHAR(45) NOT NULL
);

-- Índices para melhorar a performance
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_data_abertura ON tickets(data_abertura);

-- Comentários nas tabelas e colunas
COMMENT ON TABLE tickets IS 'Tabela para armazenar os tickets do sistema';
COMMENT ON COLUMN tickets.id IS 'Identificador único do ticket';
COMMENT ON COLUMN tickets.titulo IS 'Título do ticket';
COMMENT ON COLUMN tickets.descricao IS 'Descrição detalhada do problema';
COMMENT ON COLUMN tickets.status IS 'Status do ticket (aberto ou fechado)';
COMMENT ON COLUMN tickets.data_abertura IS 'Data e hora de abertura do ticket';
COMMENT ON COLUMN tickets.data_fechamento IS 'Data e hora de fechamento do ticket';
COMMENT ON COLUMN tickets.ip_cliente IS 'Endereço IP do cliente que abriu o ticket';
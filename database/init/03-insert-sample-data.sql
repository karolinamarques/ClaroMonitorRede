-- Inserir alguns dados de exemplo para testes
INSERT INTO tickets (titulo, descricao, status, data_abertura, ip_cliente)
VALUES 
    ('Problema de login', 'Não consigo fazer login no sistema', 'aberto', NOW() - INTERVAL '2 days', '192.168.1.1'),
    ('Erro ao salvar arquivo', 'Quando tento salvar um documento, recebo erro', 'aberto', NOW() - INTERVAL '1 day', '192.168.1.2'),
    ('Lentidão no sistema', 'O sistema está muito lento ao processar relatórios', 'fechado', NOW() - INTERVAL '5 days', '192.168.1.3'),
    ('Falha na impressão', 'Não consigo imprimir documentos', 'fechado', NOW() - INTERVAL '3 days', '192.168.1.4');

-- Atualizar data de fechamento para tickets fechados
UPDATE tickets 
SET data_fechamento = data_abertura + INTERVAL '4 hours'
WHERE status = 'fechado';
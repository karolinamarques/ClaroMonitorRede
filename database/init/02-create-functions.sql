-- Função para calcular o tempo médio de resolução dos tickets
CREATE OR REPLACE FUNCTION calcular_tempo_medio_resolucao()
RETURNS INTERVAL AS $$
DECLARE
    tempo_medio INTERVAL;
BEGIN
    SELECT AVG(data_fechamento - data_abertura) INTO tempo_medio
    FROM tickets
    WHERE status = 'fechado' AND data_fechamento IS NOT NULL;
    
    RETURN tempo_medio;
END;
$$ LANGUAGE plpgsql;

-- Função para contar tickets por status
CREATE OR REPLACE FUNCTION contar_tickets_por_status(status_param VARCHAR)
RETURNS INTEGER AS $$
DECLARE
    total INTEGER;
BEGIN
    SELECT COUNT(*) INTO total
    FROM tickets
    WHERE status = status_param;
    
    RETURN total;
END;
$$ LANGUAGE plpgsql;
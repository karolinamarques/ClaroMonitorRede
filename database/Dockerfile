FROM postgres:15-alpine

# Adicionar scripts de inicialização
COPY ./init/ /docker-entrypoint-initdb.d/

# Configurações do PostgreSQL para melhor desempenho
COPY postgresql.conf /etc/postgresql/postgresql.conf

# Executar o PostgreSQL com configurações personalizadas
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]

# Expor a porta padrão do PostgreSQL
EXPOSE 5432
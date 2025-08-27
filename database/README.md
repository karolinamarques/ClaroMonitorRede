# Banco de Dados do Sistema de Tickets

Este diretório contém a configuração do banco de dados PostgreSQL para o sistema de tickets.

## Estrutura

- `Dockerfile`: Configuração para criar a imagem Docker do PostgreSQL
- `postgresql.conf`: Arquivo de configuração do PostgreSQL
- `docker-compose.yml`: Configuração para executar o banco de dados em um contêiner
- `init/`: Scripts SQL executados na inicialização do banco
  - `01-create-tables.sql`: Cria as tabelas necessárias
  - `02-create-functions.sql`: Cria funções úteis para o sistema
  - `03-insert-sample-data.sql`: Insere dados de exemplo para testes

## Execução

Para executar apenas o banco de dados:

```bash
cd database
cp .env.example .env
# Edite o arquivo .env conforme necessário
docker-compose up -d
```

## Conexão

- **Host**: localhost
- **Porta**: 5432
- **Usuário**: postgres (ou o definido em .env)
- **Senha**: postgres (ou a definida em .env)
- **Banco de Dados**: tickets_db (ou o definido em .env)

## Tabelas

### tickets

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | SERIAL | Identificador único do ticket |
| titulo | VARCHAR(100) | Título do ticket |
| descricao | TEXT | Descrição detalhada do problema |
| status | VARCHAR(10) | Status do ticket (aberto ou fechado) |
| data_abertura | TIMESTAMP | Data e hora de abertura do ticket |
| data_fechamento | TIMESTAMP | Data e hora de fechamento do ticket |
| ip_cliente | VARCHAR(45) | Endereço IP do cliente que abriu o ticket |
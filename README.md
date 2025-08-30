# Sistema de Tickets

Sistema de gerenciamento de tickets com backend em Node.js/Express, frontend em React e banco de dados PostgreSQL.

## Estrutura do Projeto

- `backend/`: API REST em Node.js com Express
- `frontend/`: Interface de usuário em React
- `database/`: Configuração e scripts do banco de dados PostgreSQL
- `docker-compose.yml`: Configuração para executar o sistema completo

Cada componente possui seu próprio README com informações detalhadas:
- [README do Backend](backend/README.md)
- [README do Frontend](frontend/README.md)
- [README do Banco de Dados](database/README.md)

Outros requisitos da apresentação possuem seus próprios READMEs com informações detalhadas:
- [README do Splunk](other-requirements/splunk/README.md)
- [README do Mokkup.ai](other-requirements/mokkup.ai/README.md)


## Documentação

- [Guia de Configuração e Execução](SETUP.md) - **Instruções detalhadas para configurar e executar o sistema no Windows e WSL**

## Requisitos

- Docker e Docker Compose
- Node.js 18+ (para desenvolvimento local)

## Configuração Rápida

1. Clone o repositório
2. Copie os arquivos de exemplo de variáveis de ambiente:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp database/.env.example database/.env
```

3. Ajuste as variáveis de ambiente conforme necessário
4. Execute o sistema completo:

```bash
docker-compose up -d
```

Para instruções mais detalhadas, consulte o [Guia de Configuração e Execução](SETUP.md).

## Execução

### Sistema Completo

Para executar todo o sistema (frontend, backend e banco de dados):

```bash
docker-compose up -d
```

Acesse o frontend em: http://localhost:80

### Componentes Individuais

#### Backend + Banco de Dados

```bash
cd backend
docker-compose up -d
```

A API estará disponível em: http://localhost:3000

#### Frontend

```bash
cd frontend
docker-compose up -d
```

A interface estará disponível em: http://localhost:80

#### Apenas o Banco de Dados

```bash
cd database
docker-compose up -d
```

O PostgreSQL estará disponível em: localhost:5432

## Desenvolvimento Local

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Testes

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

## Arquitetura do Sistema

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│  Frontend   │◄────►│   Backend   │◄────►│  Database   │
│  (React)    │      │  (Node.js)  │      │ (PostgreSQL)│
│             │      │             │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
```

### Frontend (React)
- Interface de usuário responsiva
- Formulários para criação de tickets
- Listagem e gerenciamento de tickets
- Dashboard com métricas e gráficos

### Backend (Node.js/Express)
- API REST para gerenciamento de tickets
- Integração com serviço externo para captura de IP
- Cálculo de métricas de tickets e sistema
- Logs em formato JSON para observabilidade

### Database (PostgreSQL)
- Armazenamento persistente de tickets
- Funções para cálculo de métricas
- Índices para otimização de consultas

## Endpoints da API

- `POST /tickets`: Criar um novo ticket
- `GET /tickets`: Listar tickets (com filtro opcional por status)
- `PUT /tickets/:id`: Atualizar status de um ticket
- `GET /tickets/:id`: Obter detalhes de um ticket específico
- `GET /metrics`: Obter métricas do sistema

## Funcionalidades

- Criação de tickets com título e descrição
- Listagem de tickets com filtros
- Fechamento de tickets
- Dashboard com métricas de tickets e sistema

## Estrutura do Banco de Dados

### Tabela: tickets

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | SERIAL | Identificador único do ticket |
| titulo | VARCHAR(100) | Título do ticket |
| descricao | TEXT | Descrição detalhada do problema |
| status | VARCHAR(10) | Status do ticket (aberto ou fechado) |
| data_abertura | TIMESTAMP | Data e hora de abertura do ticket |
| data_fechamento | TIMESTAMP | Data e hora de fechamento do ticket |
| ip_cliente | VARCHAR(45) | Endereço IP do cliente que abriu o ticket |
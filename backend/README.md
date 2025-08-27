# Backend do Sistema de Tickets

API REST desenvolvida em Node.js com Express para gerenciamento de tickets.

## Estrutura do Projeto

```
backend/
├── src/                  # Código-fonte da aplicação
│   ├── models/           # Modelos de dados
│   ├── routes/           # Rotas da API
│   ├── services/         # Serviços externos
│   ├── middleware/       # Middlewares da aplicação
│   ├── app.js            # Configuração do Express
│   ├── database.js       # Configuração do banco de dados
│   └── index.js          # Ponto de entrada da aplicação
├── test/                 # Testes automatizados
├── Dockerfile            # Configuração do Docker
├── docker-compose.yml    # Configuração do Docker Compose
└── package.json          # Dependências e scripts
```

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web
- **Sequelize**: ORM para banco de dados
- **PostgreSQL**: Banco de dados relacional
- **Docker**: Containerização da aplicação
- **Morgan**: Logging de requisições HTTP
- **Axios**: Cliente HTTP para integrações externas

## Requisitos

- Node.js 18+
- PostgreSQL 15+
- Docker e Docker Compose (para execução em contêineres)

## Configuração

1. Copie o arquivo de exemplo de variáveis de ambiente:

```bash
cp .env.example .env
```

2. Ajuste as variáveis de ambiente conforme necessário:

```
# Configurações do Banco de Dados
DB_NAME=tickets_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432

# Configurações do Servidor
PORT=3000
NODE_ENV=development
```

## Instalação

### Com Docker

```bash
docker-compose up -d
```

### Sem Docker

```bash
npm install
npm run dev
```

## Scripts Disponíveis

- `npm start`: Inicia a aplicação em modo produção
- `npm run dev`: Inicia a aplicação em modo desenvolvimento com hot-reload
- `npm test`: Executa os testes automatizados

## Endpoints da API

### Tickets

- **POST /tickets**
  - Cria um novo ticket
  - Corpo da requisição:
    ```json
    {
      "titulo": "Título do ticket",
      "descricao": "Descrição detalhada do problema"
    }
    ```
  - Resposta: Objeto do ticket criado

- **GET /tickets**
  - Lista todos os tickets
  - Parâmetros de consulta:
    - `status`: Filtra por status (`aberto` ou `fechado`)
  - Resposta: Array de tickets

- **GET /tickets/:id**
  - Obtém detalhes de um ticket específico
  - Resposta: Objeto do ticket

- **PUT /tickets/:id**
  - Atualiza o status de um ticket
  - Resposta: Objeto do ticket atualizado

### Métricas

- **GET /metrics**
  - Obtém métricas do sistema
  - Resposta:
    ```json
    {
      "tickets": {
        "total": 10,
        "openTickets": 5,
        "closedTickets": 5,
        "averageResolutionTime": 3600
      },
      "system": {
        "memory": { ... },
        "cpu": { ... },
        "uptime": 3600
      }
    }
    ```

## Logs

Os logs são gerados em formato JSON para facilitar a integração com ferramentas como Splunk:

```json
{
  "level": "info",
  "message": "Servidor rodando na porta 3000"
}
```

## Testes

Execute os testes com:

```bash
npm test
```

## Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento com hot-reload:

```bash
npm run dev
```
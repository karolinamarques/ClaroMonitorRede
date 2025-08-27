# Frontend do Sistema de Tickets

Interface de usuário desenvolvida em React para o sistema de gerenciamento de tickets.

## Estrutura do Projeto

```
frontend/
├── src/                  # Código-fonte da aplicação
│   ├── components/       # Componentes React
│   ├── api.js            # Funções de integração com a API
│   ├── App.jsx           # Componente principal
│   └── main.jsx          # Ponto de entrada da aplicação
├── public/               # Arquivos estáticos
├── test/                 # Testes automatizados
├── Dockerfile            # Configuração do Docker
├── nginx.conf            # Configuração do Nginx
├── docker-compose.yml    # Configuração do Docker Compose
└── package.json          # Dependências e scripts
```

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces
- **Vite**: Ferramenta de build e desenvolvimento
- **Styled Components**: Estilização de componentes
- **React Router**: Roteamento da aplicação
- **Axios**: Cliente HTTP para comunicação com a API
- **Chart.js**: Biblioteca para criação de gráficos
- **Docker**: Containerização da aplicação
- **Nginx**: Servidor web para produção

## Requisitos

- Node.js 18+
- Docker e Docker Compose (para execução em contêineres)

## Configuração

1. Copie o arquivo de exemplo de variáveis de ambiente:

```bash
cp .env.example .env
```

2. Ajuste as variáveis de ambiente conforme necessário:

```
VITE_API_URL=http://localhost:3000
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

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila a aplicação para produção
- `npm run preview`: Visualiza a versão de produção localmente
- `npm test`: Executa os testes automatizados

## Funcionalidades

### Abertura de Tickets

- Formulário para criar novos tickets com título e descrição
- Validação de campos obrigatórios
- Feedback visual após a criação

### Listagem de Tickets

- Visualização de todos os tickets em formato de tabela
- Filtros por status (aberto/fechado)
- Ações para fechar tickets abertos

### Dashboard de Métricas

- Visualização de métricas importantes:
  - Número de tickets abertos e fechados
  - Tempo médio de resolução
  - Gráfico de distribuição de tickets
- Métricas do sistema (CPU, memória, etc.)

## Componentes Principais

### TicketForm

Formulário para criação de novos tickets com validação de campos.

### TicketList

Tabela interativa para visualização e gerenciamento de tickets com filtros.

### Dashboard

Painel com métricas e gráficos sobre os tickets e o sistema.

## Estilização

O projeto utiliza Styled Components para estilização, permitindo:

- Componentes com estilos encapsulados
- Temas e variáveis de estilo
- Estilização condicional baseada em props

## Integração com a API

A comunicação com o backend é centralizada no arquivo `api.js`, que utiliza Axios para realizar as requisições HTTP.

## Testes

Execute os testes com:

```bash
npm test
```

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:5173

## Build para Produção

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.
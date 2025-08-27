# Documentação do Sistema de Tickets

Bem-vindo à documentação do Sistema de Tickets. Este documento serve como um índice para ajudá-lo a encontrar as informações que você precisa.

## Guias Disponíveis

### Documentação Geral
- [README Principal](README.md) - Visão geral do sistema, estrutura e funcionalidades
- [Guia de Configuração e Execução](SETUP.md) - Como configurar e executar o sistema no Windows e WSL

### Documentação por Componente
- [README do Backend](backend/README.md) - Detalhes sobre a API REST e sua implementação
- [README do Frontend](frontend/README.md) - Detalhes sobre a interface de usuário
- [README do Banco de Dados](database/README.md) - Detalhes sobre a estrutura do banco de dados

## Início Rápido

Se você está começando agora, recomendamos seguir esta ordem:

1. Leia o [README Principal](README.md) para entender o sistema
2. Siga o [Guia de Configuração e Execução](SETUP.md) para configurar o ambiente
3. Explore os READMEs específicos de cada componente conforme necessário

## Fluxo de Trabalho Típico

### Para Usuários
1. Acesse o frontend em http://localhost:80
2. Crie um novo ticket na página inicial
3. Visualize e gerencie tickets na página de listagem
4. Consulte métricas no dashboard

### Para Desenvolvedores
1. Configure o ambiente seguindo o [Guia de Configuração](SETUP.md)
2. Explore o código-fonte de cada componente
3. Execute os testes para verificar a integridade do sistema
4. Faça alterações conforme necessário

## Arquitetura

O sistema segue uma arquitetura de três camadas:

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│  Frontend   │◄────►│   Backend   │◄────►│  Database   │
│  (React)    │      │  (Node.js)  │      │ (PostgreSQL)│
│             │      │             │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
```

Cada componente pode ser desenvolvido e executado independentemente, facilitando o trabalho em equipe e a manutenção do sistema.

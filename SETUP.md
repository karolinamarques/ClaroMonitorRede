# Configuração e Execução do Sistema de Tickets

Este guia explica como configurar as variáveis de ambiente e executar os contêineres da aplicação tanto no Windows quanto no WSL com Ubuntu.

## Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Configuração das Variáveis de Ambiente](#configuração-das-variáveis-de-ambiente)
3. [Execução no Windows](#execução-no-windows)
4. [Execução no WSL com Ubuntu](#execução-no-wsl-com-ubuntu)
5. [Verificação da Execução](#verificação-da-execução)
6. [Solução de Problemas Comuns](#solução-de-problemas-comuns)

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Para Windows:
- [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop)
- [Git para Windows](https://git-scm.com/download/win)

### Para WSL com Ubuntu:
- [WSL 2](https://docs.microsoft.com/pt-br/windows/wsl/install)
- [Ubuntu no WSL](https://ubuntu.com/wsl)
- [Docker Desktop com integração WSL 2](https://docs.docker.com/desktop/windows/wsl/)

## Configuração das Variáveis de Ambiente

O sistema utiliza arquivos `.env` para configurar variáveis de ambiente. Siga os passos abaixo para configurá-los:

### No Windows

1. Abra o Prompt de Comando ou PowerShell e navegue até a pasta do projeto:

```powershell
cd caminho\para\o\projeto
```

2. Crie os arquivos `.env` a partir dos exemplos:

```powershell
copy .env.example .env
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
copy database\.env.example database\.env
```

3. Edite os arquivos `.env` usando um editor de texto como o Notepad ou VS Code:

```powershell
notepad .env
notepad backend\.env
notepad frontend\.env
notepad database\.env
```

### No WSL com Ubuntu

1. Abra o terminal do Ubuntu e navegue até a pasta do projeto:

```bash
cd /caminho/para/o/projeto
```

2. Crie os arquivos `.env` a partir dos exemplos:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp database/.env.example database/.env
```

3. Edite os arquivos `.env` usando um editor de texto como o nano ou vim:

```bash
nano .env
nano backend/.env
nano frontend/.env
nano database/.env
```

### Configurações Recomendadas

#### Arquivo `.env` principal:

```
# Configurações do Banco de Dados
DB_NAME=tickets_db
DB_USER=postgres
DB_PASSWORD=sua_senha_segura
```

#### Arquivo `backend/.env`:

```
# Configurações do Banco de Dados
DB_NAME=tickets_db
DB_USER=postgres
DB_PASSWORD=sua_senha_segura
DB_HOST=db
DB_PORT=5432

# Configurações do Servidor
PORT=3000
NODE_ENV=development
```

#### Arquivo `frontend/.env`:

```
# URL da API
VITE_API_URL=http://localhost:3000
```

#### Arquivo `database/.env`:

```
# Configurações do Banco de Dados
DB_NAME=tickets_db
DB_USER=postgres
DB_PASSWORD=sua_senha_segura
DB_PORT=5432
```

## Execução no Windows

### Executando o Sistema Completo

1. Abra o Prompt de Comando ou PowerShell e navegue até a pasta do projeto:

```powershell
cd caminho\para\o\projeto
```

2. Execute o Docker Compose:

```powershell
docker-compose up -d
```

### Executando Componentes Individuais

#### Apenas o Banco de Dados:

```powershell
cd caminho\para\o\projeto\database
docker-compose up -d
```

#### Apenas o Backend:

```powershell
cd caminho\para\o\projeto\backend
docker-compose up -d
```

#### Apenas o Frontend:

```powershell
cd caminho\para\o\projeto\frontend
docker-compose up -d
```

### Verificando Logs

```powershell
# Logs de todos os contêineres
docker-compose logs

# Logs de um contêiner específico
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db

# Logs em tempo real
docker-compose logs -f
```

### Parando os Contêineres

```powershell
# Parar todos os contêineres
docker-compose down

# Parar e remover volumes (cuidado: isso apaga os dados do banco)
docker-compose down -v
```

## Execução no WSL com Ubuntu

### Executando o Sistema Completo

1. Abra o terminal do Ubuntu e navegue até a pasta do projeto:

```bash
cd /caminho/para/o/projeto
```

2. Execute o Docker Compose:

```bash
docker-compose up -d
```

### Executando Componentes Individuais

#### Apenas o Banco de Dados:

```bash
cd /caminho/para/o/projeto/database
docker-compose up -d
```

#### Apenas o Backend:

```bash
cd /caminho/para/o/projeto/backend
docker-compose up -d
```

#### Apenas o Frontend:

```bash
cd /caminho/para/o/projeto/frontend
docker-compose up -d
```

### Verificando Logs

```bash
# Logs de todos os contêineres
docker-compose logs

# Logs de um contêiner específico
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db

# Logs em tempo real
docker-compose logs -f
```

### Parando os Contêineres

```bash
# Parar todos os contêineres
docker-compose down

# Parar e remover volumes (cuidado: isso apaga os dados do banco)
docker-compose down -v
```

## Verificação da Execução

Após iniciar os contêineres, você pode verificar se a aplicação está funcionando corretamente:

1. **Frontend**: Acesse http://localhost:80 no seu navegador
2. **Backend API**: Acesse http://localhost:3000 no seu navegador
3. **Banco de Dados**: Conecte-se usando um cliente PostgreSQL:
   - Host: localhost
   - Porta: 5432
   - Usuário: postgres (ou o definido em .env)
   - Senha: sua_senha_segura (ou a definida em .env)
   - Banco de Dados: tickets_db (ou o definido em .env)

### Verificando o Status dos Contêineres

```bash
# No Windows ou WSL
docker-compose ps
```

## Solução de Problemas Comuns

### Problema: Portas já em uso

**Sintoma**: Erro indicando que as portas 80, 3000 ou 5432 já estão em uso.

**Solução**:
1. Verifique quais processos estão usando essas portas:
   - Windows: `netstat -ano | findstr "80 3000 5432"`
   - WSL/Ubuntu: `sudo netstat -tulpn | grep -E "80|3000|5432"`

2. Encerre os processos ou altere as portas nos arquivos docker-compose.yml:
   ```yaml
   ports:
     - "8080:80"  # Muda a porta externa de 80 para 8080
   ```

### Problema: Falha na conexão com o banco de dados

**Sintoma**: O backend não consegue se conectar ao banco de dados.

**Solução**:
1. Verifique se o contêiner do banco de dados está em execução:
   ```bash
   docker-compose ps
   ```

2. Verifique os logs do banco de dados:
   ```bash
   docker-compose logs db
   ```

3. Certifique-se de que as variáveis de ambiente estão configuradas corretamente no arquivo `.env` do backend.

### Problema: Frontend não consegue acessar o backend

**Sintoma**: O frontend carrega, mas não consegue obter dados do backend.

**Solução**:
1. Verifique se o backend está em execução:
   ```bash
   docker-compose ps
   ```

2. Verifique se a URL da API está configurada corretamente no arquivo `.env` do frontend.

3. Verifique se o CORS está configurado corretamente no backend.

### Problema: Permissões no WSL

**Sintoma**: Erros de permissão ao tentar executar comandos Docker no WSL.

**Solução**:
1. Adicione seu usuário ao grupo docker:
   ```bash
   sudo usermod -aG docker $USER
   ```

2. Reinicie o terminal ou faça logout e login novamente.

### Problema: Docker Desktop não está em execução

**Sintoma**: Erro "Cannot connect to the Docker daemon".

**Solução**:
1. Inicie o Docker Desktop.
2. No WSL, verifique se o serviço Docker está em execução:
   ```bash
   sudo service docker status
   sudo service docker start
   ```

## Desenvolvimento Local (Sem Docker)

Se preferir desenvolver sem Docker, você pode executar cada componente localmente:

### Backend:

```bash
cd backend
npm install
npm run dev
```

### Frontend:

```bash
cd frontend
npm install
npm run dev
```

### Banco de Dados:

Para o banco de dados, é recomendável usar Docker mesmo em desenvolvimento local, mas você também pode instalar o PostgreSQL diretamente no seu sistema.
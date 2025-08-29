FROM node:18-alpine

# Criar diretório da aplicação
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências (usando npm install em vez de npm ci)
RUN npm install --production

# Copiar código-fonte
COPY . .

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "src/index.js"]
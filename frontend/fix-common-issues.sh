#!/bin/bash

echo "Verificando e corrigindo problemas comuns..."

# Verificar se o index.html está correto
echo "Verificando index.html..."
if grep -q "main.tsx" index.html; then
  echo "Corrigindo referência de main.tsx para main.jsx em index.html"
  sed -i 's/main.tsx/main.jsx/g' index.html
fi

# Verificar se o vite.config.js existe
echo "Verificando vite.config.js..."
if [ ! -f vite.config.js ]; then
  if [ -f vite.config.ts ]; then
    echo "Convertendo vite.config.ts para vite.config.js"
    cp vite.config.ts vite.config.js
  else
    echo "Criando vite.config.js padrão"
    cat > vite.config.js << EOL
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
})
EOL
  fi
fi

# Verificar se o package.json tem os scripts corretos
echo "Verificando package.json..."
if ! grep -q '"build": "vite build"' package.json; then
  echo "O script de build não está definido corretamente no package.json"
  echo "Por favor, adicione o script: \"build\": \"vite build\""
fi

# Verificar se as dependências estão instaladas
echo "Verificando node_modules..."
if [ ! -d "node_modules" ]; then
  echo "Instalando dependências..."
  npm install
fi

echo "Verificação concluída!"
@echo off
echo Iniciando a aplicacao com monitoramento Dynatrace OneAgent...

REM Parar e remover containers existentes
echo Parando containers existentes...
docker-compose down

REM Iniciar os containers com a nova configuracao
echo Iniciando containers com Dynatrace OneAgent...
docker-compose up -d

REM Verificar o status dos containers
echo Status dos containers:
docker-compose ps

echo.
echo Verificando logs do Dynatrace OneAgent (pressione Ctrl+C para sair):
docker logs -f dynatrace-oneagent
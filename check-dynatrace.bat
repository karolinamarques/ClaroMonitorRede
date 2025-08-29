@echo off
echo Verificando o status do Dynatrace OneAgent...

REM Verificar se o container do Dynatrace está em execução
echo Status do container Dynatrace:
docker ps -a | findstr dynatrace

echo.
echo Logs do container Dynatrace:
docker logs --tail 20 dynatrace-oneagent

echo.
echo Para verificar se o agente está monitorando os containers, execute:
echo docker exec dynatrace-oneagent ps aux | grep oneagent
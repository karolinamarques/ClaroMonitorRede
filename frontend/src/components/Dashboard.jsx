import React, { useState, useEffect } from 'react';
import { getMetrics } from '../api';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Container = styled.div`
  padding: 20px;
`;

const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const MetricCard = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;

  h3 {
    margin: 0 0 10px 0;
    color: #666;
  }

  p {
    font-size: 24px;
    margin: 0;
    font-weight: bold;
  }
`;

const ChartContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ErrorMessage = styled.div`
  color: #f44336;
  padding: 10px;
  margin: 10px 0;
  background-color: #ffebee;
  border-radius: 4px;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(0,0,0,0.1);
  border-radius: 50%;
  border-top-color: #4CAF50;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

/**
 * Formata o tempo em milissegundos para um formato legível
 * @param {number} seconds - Tempo em segundos
 * @returns {string} - Tempo formatado
 */
const formatTime = (seconds) => {
  if (!seconds) return 'N/A';
  
  // Converter segundos para milissegundos
  const ms = seconds * 1000;
  
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

/**
 * Formata bytes para um formato legível
 * @param {number} bytes - Tamanho em bytes
 * @returns {string} - Tamanho formatado
 */
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getMetrics();
      setMetrics(data);
    } catch (error) {
      setError('Falha ao carregar métricas. Por favor, tente novamente.');
      console.error('Erro ao carregar métricas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    
    // Atualizar métricas a cada 30 segundos
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const chartData = metrics ? {
    labels: ['Tickets Abertos', 'Tickets Fechados'],
    datasets: [{
      data: [metrics.tickets.openTickets, metrics.tickets.closedTickets],
      backgroundColor: ['#4CAF50', '#f44336'],
      borderColor: ['#388E3C', '#D32F2F'],
      borderWidth: 1
    }]
  } : null;

  return (
    <Container>
      <h2>Dashboard de Métricas</h2>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {loading && !metrics ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <LoadingSpinner /> Carregando métricas...
        </div>
      ) : metrics ? (
        <>
          <h3>Métricas de Tickets</h3>
          <MetricsContainer>
            <MetricCard>
              <h3>Tickets Abertos</h3>
              <p>{metrics.tickets.openTickets}</p>
            </MetricCard>
            <MetricCard>
              <h3>Tickets Fechados</h3>
              <p>{metrics.tickets.closedTickets}</p>
            </MetricCard>
            <MetricCard>
              <h3>Total de Tickets</h3>
              <p>{metrics.tickets.total}</p>
            </MetricCard>
            <MetricCard>
              <h3>Tempo Médio de Resolução</h3>
              <p>{formatTime(metrics.tickets.averageResolutionTime)}</p>
            </MetricCard>
          </MetricsContainer>
          
          {chartData && (
            <ChartContainer>
              <h3>Distribuição de Tickets</h3>
              <Pie data={chartData} />
            </ChartContainer>
          )}
          
          <h3>Métricas do Sistema</h3>
          <MetricsContainer>
            <MetricCard>
              <h3>Memória Total</h3>
              <p>{formatBytes(metrics.system.memory.total)}</p>
            </MetricCard>
            <MetricCard>
              <h3>Memória Livre</h3>
              <p>{formatBytes(metrics.system.memory.free)}</p>
            </MetricCard>
            <MetricCard>
              <h3>Memória Usada</h3>
              <p>{formatBytes(metrics.system.memory.used)}</p>
            </MetricCard>
            <MetricCard>
              <h3>Núcleos de CPU</h3>
              <p>{metrics.system.cpu.cores}</p>
            </MetricCard>
            <MetricCard>
              <h3>Carga do Sistema</h3>
              <p>{metrics.system.cpu.loadAvg[0].toFixed(2)}</p>
            </MetricCard>
            <MetricCard>
              <h3>Tempo de Atividade</h3>
              <p>{Math.floor(metrics.system.uptime / 3600)} horas</p>
            </MetricCard>
          </MetricsContainer>
        </>
      ) : (
        <p>Nenhuma métrica disponível.</p>
      )}
    </Container>
  );
};

export default Dashboard;
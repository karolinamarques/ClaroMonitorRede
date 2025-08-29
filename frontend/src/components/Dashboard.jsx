import React, { useState, useEffect } from 'react';
import { getMetrics } from '../api';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title as ChartTitle } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

const Container = styled.div`
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const DashboardTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const SectionTitle = styled.h3`
  color: #34495e;
  margin: 30px 0 20px;
  font-weight: 600;
`;

const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const MetricCard = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const MetricLabel = styled.h4`
  margin: 0 0 15px 0;
  color: #7f8c8d;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MetricValue = styled.p`
  font-size: 28px;
  margin: 0;
  font-weight: 700;
  color: ${props => props.color || '#2c3e50'};
`;

const ChartContainer = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin: 30px auto;
  max-width: 500px;
`;

const ChartHeading = styled.h4`
  margin: 0 0 20px 0;
  color: #34495e;
  text-align: center;
  font-weight: 600;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  padding: 15px;
  margin: 20px 0;
  background-color: #fadbd8;
  border-radius: 4px;
  font-weight: 500;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(52, 152, 219, 0.2);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 15px;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
`;

const RefreshButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  
  &:hover {
    background-color: #2980b9;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const LastUpdated = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: right;
`;

/**
 * Formata o tempo em milissegundos para um formato legível
 * @param {number} seconds - Tempo em segundos
 * @returns {string} - Tempo formatado
 */
const formatTime = (seconds) => {
  if (!seconds) return 'N/A';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getMetrics();
      setMetrics(data);
      setLastUpdated(new Date());
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

  const statusChartData = metrics ? {
    labels: ['Abertos', 'Fechados'],
    datasets: [{
      data: [
        metrics.tickets.openTickets || 0, 
        metrics.tickets.closedTickets || 0
      ],
      backgroundColor: ['#e74c3c', '#2ecc71'],
      borderColor: ['#c0392b', '#27ae60'],
      borderWidth: 1
    }]
  } : null;

  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    return `Última atualização: ${lastUpdated.toLocaleTimeString()}`;
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  return (
    <Container>
      <HeaderRow>
        <DashboardTitle>Dashboard de Métricas</DashboardTitle>
        <RefreshButton onClick={fetchMetrics} disabled={loading}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 4v6h-6"></path>
            <path d="M1 20v-6h6"></path>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
            <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          Atualizar
        </RefreshButton>
      </HeaderRow>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {loading && !metrics ? (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Carregando métricas...</LoadingText>
        </LoadingContainer>
      ) : metrics ? (
        <>
          <SectionTitle>Visão Geral de Tickets</SectionTitle>
          <MetricsContainer>
            <MetricCard>
              <MetricLabel>Total de Tickets</MetricLabel>
              <MetricValue>{metrics.tickets.total}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Tickets Abertos</MetricLabel>
              <MetricValue color="#e74c3c">{metrics.tickets.openTickets || 0}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Tickets Fechados</MetricLabel>
              <MetricValue color="#2ecc71">{metrics.tickets.closedTickets || 0}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Tempo Médio de Resolução</MetricLabel>
              <MetricValue>{formatTime(metrics.tickets.averageResolutionTime)}</MetricValue>
            </MetricCard>
          </MetricsContainer>
          
          {statusChartData && (
            <ChartContainer>
              <ChartHeading>Distribuição por Status</ChartHeading>
              <Pie data={statusChartData} options={chartOptions} />
            </ChartContainer>
          )}
          
          <LastUpdated>{formatLastUpdated()}</LastUpdated>
        </>
      ) : (
        <p>Nenhuma métrica disponível.</p>
      )}
    </Container>
  );
};

export default Dashboard;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTickets, updateTicket } from '../api';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 10px 16px;
  background-color: ${props => props.active ? '#3498db' : '#f1f1f1'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#2980b9' : '#ddd'};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 14px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #7f8c8d;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: ${props => {
    switch (props.status) {
      case 'aberto': return '#e74c3c';
      case 'fechado': return '#2ecc71';
      default: return '#95a5a6';
    }
  }};
  color: white;
`;

const ActionButton = styled.button`
  padding: 8px 14px;
  background-color: ${props => props.color || '#e74c3c'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ViewButton = styled(Link)`
  padding: 8px 14px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  margin-right: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  padding: 12px;
  margin: 10px 0;
  background-color: #fadbd8;
  border-radius: 4px;
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(0,0,0,0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
`;

const translateStatus = (status) => {
  const statusMap = {
    'aberto': 'Aberto',
    'fechado': 'Fechado'
  };
  return statusMap[status] || status;
};

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [processingId, setProcessingId] = useState(null);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            setError('');
            
            const params = {};
            if (filter !== 'all') {
                params.status = filter;
            }
            
            const data = await getTickets(params);
            setTickets(data);
        } catch (error) {
            setError('Falha ao carregar tickets. Por favor, tente novamente.');
            console.error('Erro ao carregar tickets:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [filter]);

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            setProcessingId(id);
            await updateTicket(id, { status: newStatus });
            fetchTickets();
        } catch (error) {
            setError('Falha ao atualizar o ticket. Por favor, tente novamente.');
            console.error('Erro ao atualizar ticket:', error);
        } finally {
            setProcessingId(null);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    return (
        <Container>
            <Title>Lista de Tickets</Title>
            
            <FilterContainer>
                <FilterButton 
                    active={filter === 'all'} 
                    onClick={() => setFilter('all')}
                >
                    Todos
                </FilterButton>
                <FilterButton 
                    active={filter === 'aberto'} 
                    onClick={() => setFilter('aberto')}
                >
                    Abertos
                </FilterButton>
                <FilterButton 
                    active={filter === 'fechado'} 
                    onClick={() => setFilter('fechado')}
                >
                    Fechados
                </FilterButton>
            </FilterContainer>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <LoadingSpinner /> Carregando tickets...
                </div>
            ) : tickets.length === 0 ? (
                <EmptyState>
                    <p>Nenhum ticket encontrado.</p>
                </EmptyState>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Status</th>
                            <th>Data Abertura</th>
                            <th>Data Fechamento</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.titulo}</td>
                                <td>
                                    <StatusBadge status={ticket.status}>
                                        {translateStatus(ticket.status)}
                                    </StatusBadge>
                                </td>
                                <td>{formatDate(ticket.data_abertura)}</td>
                                <td>{formatDate(ticket.data_fechamento)}</td>
                                <td>
                                    <ButtonGroup>
                                        <ViewButton to={`/tickets/${ticket.id}`}>
                                            Visualizar
                                        </ViewButton>
                                        
                                        {ticket.status === 'aberto' && (
                                            <ActionButton 
                                                onClick={() => handleUpdateStatus(ticket.id, 'fechado')}
                                                disabled={processingId === ticket.id}
                                                color="#2ecc71"
                                            >
                                                {processingId === ticket.id ? (
                                                    <LoadingSpinner />
                                                ) : (
                                                    'Fechar'
                                                )}
                                            </ActionButton>
                                        )}
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default TicketList;
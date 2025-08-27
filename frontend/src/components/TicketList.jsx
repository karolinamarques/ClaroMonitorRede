import React, { useEffect, useState } from 'react';
import { getTickets, updateTicket } from '../api';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.active ? '#4CAF50' : '#f1f1f1'};
  color: ${props => props.active ? 'white' : 'black'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#ddd'};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f8f9fa;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  background-color: ${props => props.status === 'aberto' ? '#4CAF50' : '#f44336'};
  color: white;
  font-size: 14px;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #d32f2f;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
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

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

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

    const handleCloseTicket = async (id) => {
        try {
            setProcessingId(id);
            await updateTicket(id, { status: 'fechado' });
            fetchTickets();
        } catch (error) {
            setError('Falha ao fechar o ticket. Por favor, tente novamente.');
            console.error('Erro ao fechar ticket:', error);
        } finally {
            setProcessingId(null);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleString();
    };

    return (
        <Container>
            <h2>Lista de Tickets</h2>
            
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
                                        {ticket.status}
                                    </StatusBadge>
                                </td>
                                <td>{formatDate(ticket.data_abertura)}</td>
                                <td>{formatDate(ticket.data_fechamento)}</td>
                                <td>
                                    {ticket.status === 'aberto' && (
                                        <ActionButton 
                                            onClick={() => handleCloseTicket(ticket.id)}
                                            disabled={processingId === ticket.id}
                                        >
                                            {processingId === ticket.id ? (
                                                <LoadingSpinner />
                                            ) : (
                                                'Fechar Ticket'
                                            )}
                                        </ActionButton>
                                    )}
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
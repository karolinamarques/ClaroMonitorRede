import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getTicket, updateTicket } from '../api';

const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 20px;
  width: 100%;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const Field = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.div`
  font-weight: 600;
  color: #7f8c8d;
  margin-bottom: 4px;
  font-size: 0.9rem;
`;

const Value = styled.div`
  font-size: 1.1rem;
  color: #34495e;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

const BackButton = styled(Button)`
  background-color: #95a5a6;
  color: white;
`;

const CloseButton = styled(Button)`
  background-color: #2ecc71;
  color: white;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  padding: 12px;
  margin: 10px 0;
  background-color: #fadbd8;
  border-radius: 4px;
  font-weight: 500;
`;

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

const translateStatus = (status) => {
  const statusMap = {
    'aberto': 'Aberto',
    'fechado': 'Fechado'
  };
  return statusMap[status] || status;
};

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const loadTicket = async () => {
      try {
        setLoading(true);
        const data = await getTicket(id);
        setTicket(data);
      } catch (err) {
        setError('Erro ao carregar o ticket. Por favor, tente novamente.');
        console.error('Erro ao buscar ticket:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [id]);

  const handleCloseTicket = async () => {
    try {
      setIsClosing(true);
      await updateTicket(id, { status: 'fechado' });
      // Recarregar o ticket para mostrar as alterações
      const updatedTicket = await getTicket(id);
      setTicket(updatedTicket);
    } catch (err) {
      setError('Erro ao fechar o ticket. Por favor, tente novamente.');
      console.error('Erro ao fechar ticket:', err);
    } finally {
      setIsClosing(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <LoadingSpinner style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopColor: '#3498db' }} /> Carregando...
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <BackButton onClick={() => navigate('/tickets')}>
          Voltar para a lista
        </BackButton>
      </Container>
    );
  }

  if (!ticket) {
    return (
      <Container>
        <div>Ticket não encontrado</div>
        <BackButton onClick={() => navigate('/tickets')}>
          Voltar para a lista
        </BackButton>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Ticket #{ticket.id}</Title>
      
      <Field>
        <Label>Status</Label>
        <Value>
          <StatusBadge status={ticket.status}>
            {translateStatus(ticket.status)}
          </StatusBadge>
        </Value>
      </Field>
      
      <Field>
        <Label>Título</Label>
        <Value>{ticket.titulo}</Value>
      </Field>
      
      <Field>
        <Label>Descrição</Label>
        <Value>{ticket.descricao}</Value>
      </Field>
      
      <Field>
        <Label>Data de Abertura</Label>
        <Value>{formatDate(ticket.data_abertura)}</Value>
      </Field>
      
      {ticket.data_fechamento && (
        <Field>
          <Label>Data de Fechamento</Label>
          <Value>{formatDate(ticket.data_fechamento)}</Value>
        </Field>
      )}
      
      <Field>
        <Label>IP do Cliente</Label>
        <Value>{ticket.ip_cliente}</Value>
      </Field>
      
      <ButtonGroup>
        <BackButton onClick={() => navigate('/tickets')}>
          Voltar
        </BackButton>
        
        {ticket.status === 'aberto' && (
          <CloseButton onClick={handleCloseTicket} disabled={isClosing}>
            {isClosing ? <LoadingSpinner /> : 'Fechar Ticket'}
          </CloseButton>
        )}
      </ButtonGroup>
    </Container>
  );
};

export default TicketDetail;
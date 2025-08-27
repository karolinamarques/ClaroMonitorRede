import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import TicketList from '../src/components/TicketList';
import Dashboard from '../src/components/Dashboard';

jest.mock('axios');

describe('TicketList Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          titulo: 'Problema de login',
          status: 'aberto',
          data_abertura: '2023-10-01T10:00:00Z'
        }
      ]
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o estado de carregamento', async () => {
    render(<TicketList />);
    expect(screen.getByText('Carregando tickets...')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('Carregando tickets...')).not.toBeInTheDocument());
  });

  it('deve exibir tickets após carregamento', async () => {
    render(<TicketList />);
    await waitFor(() => {
      expect(screen.getByText('Problema de login')).toBeInTheDocument();
      expect(screen.getByText('aberto')).toBeInTheDocument();
    });
  });

  it('deve fechar ticket ao clicar no botão', async () => {
    axios.put.mockResolvedValue({});
    render(<TicketList />);
    
    await waitFor(() => screen.getByText('Fechar Ticket'));
    fireEvent.click(screen.getByText('Fechar Ticket'));
    
    expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/tickets/1', { status: 'fechado' });
  });
});

describe('Dashboard Component', () => {
  const mockMetrics = {
    open: 5,
    closed: 3,
    averageResolutionTime: 7200000 //  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockMetrics });
  });

  it('deve exibir métricas corretamente', async () => {
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Tickets Abertos')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('2h 0m')).toBeInTheDocument();
    });
  });

  it('deve formatar o tempo médio corretamente', async () => {
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('2h 0m')).toBeInTheDocument();
    });
  });

  it('deve renderizar o gráfico de pizza', async () => {
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });
});
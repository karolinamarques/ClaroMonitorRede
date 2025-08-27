import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';

jest.mock('../src/components/TicketForm', () => () => <div>TicketForm Mock</div>);
jest.mock('../src/components/TicketList', () => () => <div>TicketList Mock</div>);
jest.mock('../src/components/Dashboard', () => () => <div>Dashboard Mock</div>);

describe('App Component', () => {
    test('renders navigation links', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('Abrir Ticket')).toBeInTheDocument();
        expect(screen.getByText('Listar Tickets')).toBeInTheDocument();
        expect(screen.getByText('Métricas')).toBeInTheDocument();
    });

    test('renders TicketForm on root route', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('TicketForm Mock')).toBeInTheDocument();
    });

    test('renders TicketList on /tickets route', () => {
        render(
            <MemoryRouter initialEntries={['/tickets']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('TicketList Mock')).toBeInTheDocument();
    });

    test('renders Dashboard on /metrics route', () => {
        render(
            <MemoryRouter initialEntries={['/metrics']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText('Dashboard Mock')).toBeInTheDocument();
    });
});
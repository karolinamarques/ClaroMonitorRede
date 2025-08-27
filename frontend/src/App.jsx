import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import Dashboard from './components/Dashboard';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #f8f9fa;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  
  a {
    text-decoration: none;
    color: #333;
    padding: 10px;
    
    &:hover {
      color: #007bff;
    }
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  margin-top: 40px;
  border-top: 1px solid #eee;
  color: #666;
`;

const App = () => {
    return (
        <Router>
            <Header>
                <Nav>
                    <Link to="/">Abrir Ticket</Link>
                    <Link to="/tickets">Listar Tickets</Link>
                    <Link to="/metrics">Métricas</Link>
                </Nav>
            </Header>
            
            <Container>
                <Routes>
                    <Route path="/" element={<TicketForm />} />
                    <Route path="/tickets" element={<TicketList />} />
                    <Route path="/metrics" element={<Dashboard />} />
                </Routes>
            </Container>
            
            <Footer>
                Sistema de Tickets &copy; {new Date().getFullYear()}
            </Footer>
        </Router>
    );
};

export default App;
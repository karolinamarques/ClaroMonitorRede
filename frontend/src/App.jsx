import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import Dashboard from './components/Dashboard';

// Estilos globais
const AppContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Header
const Header = styled.header`
  background-color: #2c3e50;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  padding: 20px;
  color: #3498db;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
  }
`;

const Nav = styled.nav`
  display: flex;
  
  a {
    text-decoration: none;
    color: #ecf0f1;
    padding: 20px;
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #34495e;
    }
  }
`;

// Main content
const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

// Footer
const Footer = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px 0;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Header>
          <HeaderContent>
            <Logo>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Sistema de Tickets
            </Logo>
            <Nav>
              <Link to="/">Abrir Ticket</Link>
              <Link to="/tickets">Listar Tickets</Link>
              <Link to="/metrics">Métricas</Link>
            </Nav>
          </HeaderContent>
        </Header>
        
        <MainContent>
          <ContentWrapper>
            <Routes>
              <Route path="/" element={<TicketForm />} />
              <Route path="/tickets" element={<TicketList />} />
              <Route path="/tickets/:id" element={<TicketDetail />} />
              <Route path="/metrics" element={<Dashboard />} />
            </Routes>
          </ContentWrapper>
        </MainContent>
        
        <Footer>
          <FooterContent>
            Sistema de Tickets &copy; {new Date().getFullYear()} - Desenvolvido com React e Docker
          </FooterContent>
        </Footer>
      </AppContainer>
    </Router>
  );
};

export default App;
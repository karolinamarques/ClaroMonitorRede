import React, { useState } from 'react';
import { createTicket } from '../api';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 150px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #45a049;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #f44336;
  margin-top: 10px;
`;

const SuccessMessage = styled.p`
  color: #4CAF50;
  margin-top: 10px;
`;

const TicketForm = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        if (!titulo.trim()) {
            setError('O título é obrigatório.');
            return false;
        }
        
        if (!descricao.trim()) {
            setError('A descrição é obrigatória.');
            return false;
        }
        
        if (titulo.length > 100) {
            setError('O título deve ter no máximo 100 caracteres.');
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);

        try {
            await createTicket({ titulo, descricao });
            setTitulo('');
            setDescricao('');
            setSuccess('Ticket criado com sucesso!');
            
            // Limpa a mensagem de sucesso após 5 segundos
            setTimeout(() => setSuccess(''), 5000);
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao criar ticket. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormContainer>
            <h2>Abrir Novo Ticket</h2>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="titulo">Título:</Label>
                    <Input
                        id="titulo"
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Digite o título do ticket"
                        maxLength="100"
                        disabled={isSubmitting}
                    />
                </FormGroup>
                
                <FormGroup>
                    <Label htmlFor="descricao">Descrição:</Label>
                    <TextArea
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descreva o problema em detalhes"
                        disabled={isSubmitting}
                    />
                </FormGroup>
                
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}
                
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Criar Ticket'}
                </Button>
            </form>
        </FormContainer>
    );
};

export default TicketForm;
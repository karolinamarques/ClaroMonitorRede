import React, { useState } from 'react';
import { createTicket } from '../api';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 100%;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #34495e;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 150px;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 14px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  padding: 12px;
  margin: 10px 0 20px;
  background-color: #fadbd8;
  border-radius: 4px;
  font-weight: 500;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  padding: 12px;
  margin: 10px 0 20px;
  background-color: #d5f5e3;
  border-radius: 4px;
  font-weight: 500;
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 0.8rem;
  color: ${props => props.isNearLimit ? '#e74c3c' : '#7f8c8d'};
  margin-top: 4px;
`;

const TicketForm = () => {
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.titulo.trim()) {
            setError('O título é obrigatório.');
            return false;
        }
        
        if (!formData.descricao.trim()) {
            setError('A descrição é obrigatória.');
            return false;
        }
        
        if (formData.titulo.length > 100) {
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
            await createTicket(formData);
            setFormData({
                titulo: '',
                descricao: ''
            });
            setSuccess('Ticket criado com sucesso!');
            
            // Limpa a mensagem de sucesso após 5 segundos
            setTimeout(() => setSuccess(''), 5000);
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao criar ticket. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isTitleNearLimit = formData.titulo.length > 80;

    return (
        <FormContainer>
            <Title>Abrir Novo Ticket</Title>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="titulo">Título:</Label>
                    <Input
                        id="titulo"
                        name="titulo"
                        type="text"
                        value={formData.titulo}
                        onChange={handleChange}
                        placeholder="Digite um título claro e objetivo"
                        maxLength="100"
                        disabled={isSubmitting}
                    />
                    <CharCount isNearLimit={isTitleNearLimit}>
                        {formData.titulo.length}/100 caracteres
                    </CharCount>
                </FormGroup>
                
                <FormGroup>
                    <Label htmlFor="descricao">Descrição:</Label>
                    <TextArea
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Descreva o problema em detalhes. Quanto mais informações você fornecer, mais rápido poderemos ajudar."
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        endereco: '',
        veiculo: '',
        plano: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Salva os dados no localStorage
        localStorage.setItem('formData', JSON.stringify(formData));
        
        console.log(formData); // Verifica os dados no console (remova para produção)
        
        // Redireciona para a página de QR Code
        navigate('/qrcode');
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
                <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required />
                <input type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} required />
                <input type="text" name="veiculo" placeholder="Informações do veículo" value={formData.veiculo} onChange={handleChange} required />
                <select name="plano" value={formData.plano} onChange={handleChange} required>
                    <option value="">Selecione um plano</option>
                    <option value="basico">Básico</option>
                    <option value="premium">Premium</option>
                </select>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;

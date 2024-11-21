import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        password: '',
        endereco: '',
        veiculo: '',
        plano: ''
    });
    const [carImage, setCarImage] = useState(''); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const fetchCarImage = async (carName) => {
        const accessKey = 'ZY_O57WXTiG3Q1vXiSw4E5fOmECbRSr5RTyiVRZ3oqo'; 
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${carName}&client_id=${accessKey}`);
        const data = await response.json();
        if (data.results.length > 0) {
            return data.results[0].urls.small; 
        }
        console.log('Nenhuma imagem encontrada');
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Fetch da imagem do carro
        const carImageUrl = await fetchCarImage(formData.veiculo);
        
        // Atualiza o estado com a imagem do carro
        setCarImage(carImageUrl); 
        
        // Cria o objeto para enviar, incluindo a imagem do carro
        const dataToStore = { ...formData, carImage: carImageUrl };
    
        try {
            // Envia os dados para o backend
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToStore),
            });
    
            if (response.ok) {
                console.log('Usuário registrado com sucesso');
                
                // Armazena os dados no localStorage após o sucesso
                localStorage.setItem('formData', JSON.stringify(dataToStore)); // Armazenando os dados no localStorage
                
                // Navega para a página do QR Code
                navigate('/qrcode'); 
            } else {
                console.error('Erro ao registrar o usuário');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };
    
    

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
                <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
                <input type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} required />
                <input type="text" name="veiculo" placeholder="Informações do veículo" value={formData.veiculo} onChange={handleChange} required />
                <select name="plano" value={formData.plano} onChange={handleChange} required>
                    <option value="">Selecione um plano</option>
                    <option value="basico">Básico</option>
                    <option value="premium">Premium</option>
                </select>
                <button type="submit">Registrar</button>
                <p>Já tem uma conta?</p>
                <Link className='loginLink' to="/login">
                    Login
                </Link>
            </form>
        </div>
    );
};

export default Register;

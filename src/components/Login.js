/**
 * Criado por: Guilherme Duffes Marques
 * Data de criação: 12/11/2024
 * Hora de criação: 17:20
 */

import React, { useState } from 'react'; // importa React e useState para gerenciar o estado
import { useNavigate } from 'react-router-dom'; // importa useNavigate para navegação entre páginas

// define o componente funcional Login
const Login = () => {
    // usa o hook useState para definir e atualizar os estados de cpf e senha
    const [cpf, setCpf] = useState(''); 
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // cria a função de navegação para redirecionar após o login

    // função de manipulação do login ao enviar o formulário
    const handleLogin = async (e) => {
        e.preventDefault(); // impede o comportamento padrão do formulário (recarregar a página)

        const loginData = { cpf, password }; // cria um objeto com os dados do login

        try {
            // faz uma requisição POST para o servidor para verificar as credenciais
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // define o tipo de conteúdo como JSON
                },
                body: JSON.stringify(loginData), // envia os dados do login como JSON no corpo da requisição
            });

            const data = await response.json(); // aguarda e converte a resposta em JSON

            if (response.ok) { // verifica se a resposta foi bem-sucedida
                localStorage.setItem('isAuthenticated', 'true'); // salva no localStorage que o usuário está autenticado
                navigate('/dashboard'); // redireciona para a página do dashboard após login bem-sucedido
            } else {
                alert(data.message || 'Erro ao tentar fazer login'); // exibe uma mensagem de erro, caso haja
            }
        } catch (error) {
            console.error('Erro na requisição:', error); // exibe o erro no console, caso aconteça
            alert('Erro ao tentar fazer login'); // exibe uma mensagem de erro
        }
    };

    return (
        <div>
            <h2>Login</h2> {/* título do formulário de login */}
            <form onSubmit={handleLogin}> {/* ao submeter o formulário, chama a função handleLogin */}
                {/* campo de CPF */}
                <input 
                    type="text" 
                    placeholder="CPF" 
                    value={cpf} 
                    onChange={(e) => setCpf(e.target.value)} // atualiza o estado de cpf
                    required // define como obrigatório
                />
                {/* campo de senha */}
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} // atualiza o estado de senha
                    required // define como obrigatório
                />
                {/* botão de enviar */}
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login; // exporta o componente Login para uso em outros arquivos

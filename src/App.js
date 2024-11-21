/**
 * Criado por: Guilherme Duffes Marques
 * Data de criação: 12/11/2024
 * Hora de criação: 17:20
 */


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // importa o Router e as funções de roteamento
import Register from './components/Register';  // importa o componente de registro
import QRCode from './components/QrCode';  // importa o componente QRCode
import Dashboard from './components/Dashboard';  // importa o componente Dashboard
import Header from './components/Header';  // importa o componente Header
import Login from './components/Login';  // importa o componente Login
import { AppProvider } from './components/Data';  // importa o AppProvider para contexto
import './App.css';  // importa o arquivo de estilo principal

const App = () => {
    return (
        <AppProvider> {/* envolve a aplicação com o contexto para fornecer dados a todos os componentes filhos */}
            <Router> {/* define o Router para gerenciamento de rotas */}
                <Routes> {/* define as rotas da aplicação */}
                    <Route path="/" element={<Register />} /> {/* Rota inicial que renderiza o componente Register */}
                    <Route path="/login" element={<Login />} /> {/* Rota para a página de login */}
                    <Route path="/qrcode" element={<QRCode />} /> {/* Rota para o QRCode */}
                    <Route 
                        path="/dashboard" 
                        element={ 
                            <>
                                <Header /> {/* Exibe o componente Header dentro da página Dashboard */}
                                <Dashboard /> {/* Exibe o componente Dashboard */}
                            </>
                        } 
                    /> {/* Rota para o Dashboard, exibindo também o Header */}
                </Routes>
            </Router>
        </AppProvider>
    );
};

export default App;  // exporta o componente App para ser utilizado em outros arquivos

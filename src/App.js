import React from 'react';
import {QRCodeSVG} from 'qrcode.react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register'; // Importando o componente de registro
import QRCode from './components/QrCode'; // Importando o componente de QR Code
import Dashboard from './components/Dashboard';
import Header from './components/Header'; // Importando o Header
import { AppProvider } from './components/Data'; // Importando o Provider
import './App.css';

const App = () => {
    return (
        <AppProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Register />} /> {/* Rota para o registro */}
                    <Route path="/qrcode" element={<QRCode />} /> {/* Rota para QR Code */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <>
                                <Header /> {/* Header visível apenas no Dashboard */}
                                <Dashboard />
                            </>
                        } 
                    /> {/* Rota para o Dashboard */}
                </Routes>
            </Router>
        </AppProvider>
    );
};

export default App;

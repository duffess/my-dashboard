import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'; // import de 3 componentes do leaflet
import L from 'leaflet'; // import da propria biblioteca
import 'leaflet/dist/leaflet.css'; // css da biblioteca
import './Dashboard.css';

// script que corrige os icones da biblioteca
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    // definindo as url pros icones e sombra do marcador
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Dashboard = () => {
    // state position com coordenada inicial
    const [position, setPosition] = useState({ lat: -22.9068, lng: -43.1729 });

    // state para armazenar os dados do registro
    const [formData, setFormData] = useState(null);

    // Recupera os dados do localStorage quando o componente carrega
    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);

    // 1 useEffect que executa de 2 em 2s pra atualizar a posição, diminuindo 0.0001 de lat e lng
    useEffect(() => {
        const interval = setInterval(() => {
            setPosition(prevPosition => ({
                lat: prevPosition.lat - 0.0001,
                lng: prevPosition.lng - 0.0001,
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="dashboard">
            {/* Exibe as informações do registro */}
            {formData ? (
                <div className="form-data-display">
                    <h2>Informações do Registro</h2>
                    <p><strong>Nome:</strong> {formData.nome}</p>
                    <p><strong>CPF:</strong> {formData.cpf}</p>
                    <p><strong>Endereço:</strong> {formData.endereco}</p>
                    <p><strong>Veículo:</strong> {formData.veiculo}</p>
                    <p><strong>Plano:</strong> {formData.plano}</p>
                </div>
            ) : (
                <p>Nenhum dado encontrado.</p>
            )}

            <div className='divCima'>
                <div className='boxCima'></div>
                <div className='boxCima'></div>
                <div className='boxCima'></div>
                <div className='boxCima'></div>
            </div>

            <div className='divBaixo'>
                <div className='boxBaixo1'>
                    <MapContainer 
                        center={position} // usado pra definir a posição de acordo com o state
                        zoom={15} // zoom do mapa
                        style={{ width: '100%', height: '400px' }}>  
                        {/* camada de fundo do mapa usando o serviço OpenStreetMap */}
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        <Marker position={position}></Marker>
                    </MapContainer>
                </div>
                <div className='boxBaixo2'>

                    {formData ? (
                    <p>
                        <strong>Nome:</strong> {formData.nome} | 
                        <strong> CPF:</strong> {formData.cpf} | 
                        <strong> Endereço:</strong> {formData.endereco} | 
                        <strong> Veículo:</strong> {formData.veiculo} | 
                        <strong> Plano:</strong> {formData.plano}
                    </p>
                ) : (
                    <p>Nenhum dado encontrado.</p>
                )}

                </div>
            </div>
        </main>
    );
};

export default Dashboard;

import React, { useState, useEffect } from 'react'; // importa react, useState e useEffect para criar componentes funcionais com estado e efeitos colaterais
import { MapContainer, TileLayer, Marker } from 'react-leaflet'; // importa componentes do react-leaflet para exibir mapas
import CountUp from 'react-countup'; // importa countup para criar animações de contagem
import L from 'leaflet'; // importa leaflet para manipulação de mapas
import 'leaflet/dist/leaflet.css'; // importa o css padrão do leaflet
import './Dashboard.css'; // importa o css específico para o dashboard
import iconeCarro from '../assets/icons/carro.png'; // importa ícone de carro
import iconecadeado from '../assets/icons/cadeado-aberto.png'; // importa ícone de cadeado
import iconeVelocimetro from '../assets/icons/velocimetro.png'; // importa ícone de velocímetro
import iconePower from '../assets/icons/botao-de-energia-desligado.png'; // importa ícone de energia

// remove a função padrão de busca de ícone e configura ícones customizados para o leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Dashboard = () => {
    const [position, setPosition] = useState({ lat: -22.9068, lng: -43.1729 }); // estado inicial da posição do mapa
    const [formData, setFormData] = useState(null); // estado para armazenar dados do formulário
    const [carImage, setCarImage] = useState(''); // estado para armazenar a imagem do carro
    const [distancia, setDistancia] = useState(0); // estado para armazenar a distância percorrida
    const [velocidade, setVelocidade] = useState(0);

    // efeito para gerar e configurar uma velocidade aleatória
    useEffect(() => {
        const velocidadeRandom = Math.floor(Math.random() * 145);
        setVelocidade(velocidadeRandom); // define a velocidade média
        console.log(distancia); // loga a distância no console
    }, []);

    // efeito para gerar e configurar uma distância aleatória
    useEffect(() => {
        const distanciaRandom = Math.floor(Math.random() * 1001);
        setDistancia(distanciaRandom); // define a distância aleatória
    }, []);

    // efeito para recuperar dados do localStorage na montagem do componente
    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) { // verifica se há dados no localStorage
            const data = JSON.parse(storedData); // converte os dados de string para objeto
            console.log(`dados recuperados do localstorage: ${JSON.stringify(data)}`);
            setFormData(data); // define os dados no estado
            setCarImage(data.carImage || ''); // define a imagem do carro no estado
        }
    }, []);

    // efeito para mover a posição do marcador no mapa a cada 2 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setPosition(prevPosition => ({
                lat: prevPosition.lat - 0.0001, // atualiza a latitude
                lng: prevPosition.lng - 0.0001, // atualiza a longitude
            }));
        }, 2000);

        return () => clearInterval(interval); // limpa o intervalo ao desmontar o componente
    }, []);

    return (
        <main className="dashboard"> {/* elemento principal do componente dashboard */}
            <div className='divCima'> {/* div para a seção superior */}
                <div className='boxCima'> {/* box com informações sobre a distância */}
                    <img className='imagemIcone' src={iconeCarro} alt="ícone do carro" />
                    <div className='atributoBox'>
                        <span>essa semana, você andou:</span>
                        <div className='contUp'>
                            <CountUp className='contagem' startOnMount={true} start={0} end={distancia} duration={7} />
                            <span>km</span>
                        </div>
                    </div>
                </div>
                {/* outras boxes com ícones e informações */}
                <div className='boxCima'>
                    <img className='imagemIcone' src={iconecadeado} alt="ícone de cadeado" />
                    <div className='atributoBox'>
                        <span style={{ fontWeight: "bold" }}>bloquear o sistema do carro</span>
                    </div>
                </div>
                <div className='boxCima'>
                    <img className='imagemIcone' src={iconeVelocimetro} alt="ícone de velocímetro" />
                    <div className='atributoBox'>
                        <span>sua velocidade média foi de:</span>
                        <div className='contUp'>
                            <CountUp className='contagem' startOnMount={true} start={0} end={velocidade} duration={7} />
                            <span>km</span>
                        </div>
                    </div>
                </div>
                <div className='boxCima'>
                    <img className='imagemIcone' src={iconePower} alt="ícone de energia" />
                    <div className='atributoBox'>
                        <span style={{ fontWeight: "bold" }}>desligar rastreador</span>
                    </div>
                </div>
            </div>

            <div className='divBaixo'> {/* div para a seção inferior */}
                <div className='boxBaixo1'> {/* box com o mapa */}
                    <MapContainer
                        center={position}
                        zoom={15}
                        style={{ width: '100%', height: '400px' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; openstreetmap contributors'
                        />
                        <Marker position={position}></Marker>
                    </MapContainer>
                </div>
                <div className='boxBaixo2'> {/* box com informações do carro */}
                    {carImage ? (
                        <img src={carImage} alt={`imagem de um ${formData?.veiculo}`} className='car-image' />
                    ) : (
                        <p>nenhuma imagem do veículo disponível.</p>
                    )}
                    {formData ? (
                        <div className='divInfo'>
                            <p>
                                <strong>nome:</strong> {formData.nome} <br />
                                <strong>cpf:</strong> {formData.cpf} <br />
                                <strong>endereço:</strong> {formData.endereco} <br />
                                <strong>veículo:</strong> {formData.veiculo} <br />
                                <strong>plano:</strong> {formData.plano}
                            </p>
                        </div>
                    ) : (
                        <p>nenhum dado encontrado.</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Dashboard;

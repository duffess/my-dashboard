/**
 * Criado por: Guilherme Duffes Marques
 * Data de criação: 12/11/2024
 * Hora de criação: 17:20
 */


import React from 'react'; // importa React para criar componentes
import { QRCodeSVG } from 'qrcode.react'; // importa o componente QRCodeSVG para gerar o código QR
import { useNavigate } from 'react-router-dom'; // importa useNavigate para navegação entre páginas
import './QrCode.css'; // importa o arquivo de estilo específico para este componente

const QRCode = () => {
    const navigate = useNavigate(); // cria a função de navegação para redirecionamento

    // função que simula a confirmação de pagamento e redireciona para o dashboard
    const handlePaymentClick = () => {
        console.log('Pagamento simulado confirmado'); // simula a confirmação de pagamento
        navigate('/dashboard'); // redireciona para a página do dashboard após a confirmação
    };

    return (
        <div className="qr-code-container"> {/* container principal do código QR */}
            <h1>QrCode de Pagamento</h1> {/* título da seção */}
            <div className="qr-code"> {/* contêiner do código QR */}
                <QRCodeSVG
                    value={"https://picturesofpeoplescanningqrcodes.tumblr.com/"} // link associado ao código QR
                    title={"QrCodeDuffes"} // título opcional do código QR
                    size={256} // tamanho do código QR
                    bgColor={"#000"} // cor de fundo do código QR
                    fgColor={"#fff"} // cor do primeiro plano (código QR)
                    level={"M"} // nível de correção de erros do código QR
                    imageSettings={{
                        src: "https://static.zpao.com/favicon.png", // ícone a ser inserido no centro do código QR
                        x: undefined,
                        y: undefined,
                        height: 24, // altura do ícone no centro
                        width: 24, // largura do ícone no centro
                        opacity: 1, // opacidade do ícone
                        excavate: true,
                    }}
                />
            </div>
            <button onClick={handlePaymentClick}>Já paguei</button> {/* botão para confirmar pagamento */}
        </div>
    );
};

export default QRCode; // exporta o componente QRCode para uso em outros arquivos

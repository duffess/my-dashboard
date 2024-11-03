import React from 'react';
import {QRCodeSVG} from 'qrcode.react';
import { useNavigate } from 'react-router-dom'; // Importar o useNavigate
import './QrCode.css'; // Importando estilos específicos, se necessário

const QRCode = () => {
    const navigate = useNavigate(); // Definir o hook useNavigate

    const handlePaymentClick = () => {
        console.log('Pagamento simulado confirmado');
        navigate('/dashboard'); 
    };

    return (
        <div className="qr-code-container">
            <h1>QRCode de Pagamento</h1>
            <div className="qr-code"> 
                <QRCodeSVG
                    value={"https://picturesofpeoplescanningqrcodes.tumblr.com/"}
                    title={"QrCodeDuffes"}
                    size={256}
                    bgColor={"#ea9595"}
                    fgColor={"#ff0000"}
                    level={"M"}
                    imageSettings={{
                        src: "https://static.zpao.com/favicon.png",
                        x: undefined,
                        y: undefined,
                        height: 24,
                        width: 24,
                        opacity: 1,
                        excavate: true,
                    }}
                />
            </div>
            <button onClick={handlePaymentClick}>Já paguei</button>
        </div>
    );
};

export default QRCode;

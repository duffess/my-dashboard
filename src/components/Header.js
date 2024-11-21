/**
 * Criado por: Guilherme Duffes Marques
 * Data de criação: 12/11/2024
 * Hora de criação: 17:20
 */

import React from 'react'; // importa a biblioteca React
import './Header.css'; // importa o arquivo de estilos CSS para o componente Header
import HomeIcon from '@mui/icons-material/HomeRounded'; // importa o ícone de casa do Material UI
import LocalPhoneIcon from '@mui/icons-material/LocalPhoneRounded'; // importa o ícone de telefone do Material UI
import PlayCircleIcon from '@mui/icons-material/PlayCircleRounded'; // importa o ícone de play do Material UI
import SettingsIcon from '@mui/icons-material/SettingsRounded'; // importa o ícone de configurações do Material UI
import Twitter from '../assets/x.png'; // importa a imagem do Twitter a partir dos assets

// define o componente funcional Header
const Header = () => {
    return (
        // contêiner principal do componente Header
        <div className='paiHeader'>
            <header className="header"> {/* define o cabeçalho com a classe CSS 'header' */}
                <img className='Logo' src={Twitter} alt="Twitter Logo" /> {/* exibe o logotipo do Twitter com a classe CSS 'Logo' */}
                <div className='divIcons'> {/* contêiner para os ícones */}
                    {/* cada ícone do Material UI é estilizado com margem, tamanho e cor personalizados */}
                    <HomeIcon style={{ marginRight: '10px', fontSize: '32px', color: 'white' }} className='home' />
                    <LocalPhoneIcon style={{ marginRight: '10px', fontSize: '32px', color: 'white' }} className='home' />
                    <PlayCircleIcon style={{ marginRight: '10px', fontSize: '32px', color: 'white' }} className='home' />
                    <SettingsIcon style={{ marginRight: '10px', fontSize: '32px', color: 'white' }} className='home' />
                </div>
            </header>
        </div>
    );
};

export default Header; // exporta o componente Header para uso em outros arquivos

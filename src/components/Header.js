import React from 'react';
import './Header.css';
import HomeIcon from '@mui/icons-material/HomeRounded';
import LocalPhoneIcon from '@mui/icons-material/LocalPhoneRounded';
import PlayCircleIcon from '@mui/icons-material/PlayCircleRounded';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import Twitter from '../assets/x.png';

const Header = () => {
    return (
        <div>

            <header className="header">
                <img src={Twitter} />
                <div className='divIcons' >
                <HomeIcon style={{ marginRight: '10px', fontSize: '32px', color: 'white' }} className='home' />
                <LocalPhoneIcon style={{ marginRight: '10px', fontSize: '32px', color: 'white' }}className='home' />
                <PlayCircleIcon style={{ marginRight: '10px', fontSize: '32px', color: 'white' }}className='home' />
                <SettingsIcon style={{ marginRight: '10px', fontSize: '32px', color: 'white' }}className='home' />
                </div>
            </header>
        </div>
    );
};

export default Header;
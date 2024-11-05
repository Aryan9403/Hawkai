import React from 'react';
import './SplashScreen.css';
import logo from './logo.jpg'; // Properly import the logo image

const SplashScreen = () => {
    return (
        <div className="splash-screen">
            <img src={logo} alt="Logo" className="splash-logo" />
        </div>
    );
};

export default SplashScreen;

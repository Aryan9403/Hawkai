// src/App.js
import React from 'react';
import LandingPage from './components/LandingPage';
import ModelArchitecture from './components/ModelArchitecture';
import InformationSections from './components/InformationSection';

function App() {
    return (
        <div>
            <LandingPage/>
            <ModelArchitecture/>
            <InformationSections/>
            
        </div>
    );
}

export default App;

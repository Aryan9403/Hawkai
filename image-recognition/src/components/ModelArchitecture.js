// src/components/ModelArchitecture.js
import React, { useState } from 'react';
import './ModelArchitecture.css';
import InformationSection from './InformationSection';

function ModelArchitecture() {
    const [selectedStage, setSelectedStage] = useState(null);

    const handleStageClick = (stage) => {
        setSelectedStage(stage);
        const infoBox = document.getElementById("info-box");
        if (infoBox) {
            infoBox.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <div className="architecture-container">
                {/* Stage Buttons */}
                <div className="architecture-stage">
                    <button 
                        className="stage-box" 
                        onClick={() => handleStageClick('dataset')}
                    >
                        Dataset (DS)
                    </button>
                    <div className="arrow">&#x2193;</div>
                </div>
                <div className="architecture-stage">
                    <button 
                        className="stage-box" 
                        onClick={() => handleStageClick('preprocessing')}
                    >
                        Pre-Processing
                    </button>
                    <div className="arrow">&#x2193;</div>
                </div>
                <div className="architecture-stage">
                    <button 
                        className="stage-box" 
                        onClick={() => handleStageClick('encoder')}
                    >
                        VPT Encoder
                    </button>
                    <div className="arrow">&#x2193;</div>
                </div>
                <div className="architecture-stage">
                    <button 
                        className="stage-box" 
                        onClick={() => handleStageClick('BERT_Embeddings')}
                    >
                        BERT Embeddings
                    </button>
                    <div className="arrow">&#x2193;</div>
                </div>
                <div className="architecture-stage">
                    <button 
                        className="stage-box" 
                        onClick={() => handleStageClick('data_cleansing')}
                    >
                        Data Cleansing
                    </button>
                    <div className="arrow">&#x2193;</div>
                </div>
                <div className="architecture-stage">
                    <button 
                        className="stage-box" 
                        onClick={() => handleStageClick('Training BERT transformers')}
                    >
                        Training BERT Transformers
                    </button>
                    <div className="arrow">&#x2193;</div>
                </div>
                <div className="architecture-stage">
                    <button 
                        className="stage-box" 
                        onClick={() => handleStageClick('text-output')}
                    >
                        Text Output
                    </button>
                    <div className="arrow">&#x2193;</div>
                </div>
                <div className="architecture-stage">
                    <button 
                        className="stage-box" 
                        onClick={() => handleStageClick('test-set')}
                    >
                        Test Set
                    </button>
                </div>
            </div>

            {/* Conditionally Render Information Section */}
            {selectedStage && (
                <div id="info-box">
                    <InformationSection selectedStage={selectedStage} />
                </div>
            )}
        </div>
    );
}

export default ModelArchitecture;

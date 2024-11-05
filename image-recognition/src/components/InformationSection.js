// src/components/InformationSection.js
import React from 'react';
import './InformationSection.css';

function InformationSection({ selectedStage }) {
    if (!selectedStage) {
        return (
            <div className="information-box">
                <p>Please select a stage to see more information.</p>
            </div>
        );
    }

    let content;

    switch (selectedStage) {
        case 'dataset':
            content = (
                <>
                    <h2>Dataset</h2>
                    <p>The dataset contains about 90,000 unique, unlabeled images.<br>Approximately 19,000 images have no text.</br></p>
                </>
            );
            break;
        case 'preprocessing':
            content = (
                <>
                    <h2>Pre-Processing</h2>
                    <p>We pre-process the images to identify key entities and isolate important attributes for analysis.</p>
                </>
            );
            break;
        case 'encoder':
            content = (
                <>
                    <h2>VPT Encoder and Text Extraction</h2>
                    <p>The system uses OCR (PaddleOCR) to predict and extract text. Additional analysis evaluates the OCR output for accuracy.</p>
                </>
            );
            break;
        case 'BERT_Embeddings':
            content = (
                <>
                    <h2>Creating BERT Embeddings</h2>
                    <p>We create vector embeddings based on shapes present in the images for deeper analysis.</p>
                </>
            );
            break;
        case 'data_cleansing':
            content = (
                <>
                    <h2>Data Cleansing</h2>
                    <p>The dataset is cleaned to remove any irrelevant or erroneous text extracted during processing.</p>
                </>
            );
            break;
        case 'Training BERT transformers':
            content = (
                <>
                    <h2>Training BERT Transformers</h2>
                    <p>This step trains bidirectional transformers to enhance text analysis capabilities.</p>
                </>
            );
            break;
        case 'text-output':
            content = (
                <>
                    <h2>Text Output</h2>
                    <p>The system predicts key entity values for each image based on the extracted text.</p>
                </>
            );
            break;
        case 'test-set':
            content = (
                <>
                    <h2>Test Set</h2>
                    <p>The test set is used to evaluate and validate the model's performance.</p>
                </>
            );
            break;
        default:
            content = null;
    }

    return (
        <div className="information-box">
            {content}
        </div>
    );
}

export default InformationSection;

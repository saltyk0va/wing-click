import React from 'react';
import './Popup.css'; // Import your CSS
import MyAudioComponent from './Sfx'; // Import the audio component

function Popup({ onClose }) {
    const audio = MyAudioComponent();
    const handleClose = () => {
        if (audio && audio.playSound) {
            audio.playSound('popupClose');
        }
        onClose(); // Call the onClose prop to notify the parent
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
            <h3>THIS IS A WASTE OF TIME</h3>
            <p>There are 9 levels, which each one constitutes a circle of heaven.<br></br>You'll have to click your way to The Empyrean </p>
                <div className="button-container">
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default Popup;
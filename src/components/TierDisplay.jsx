// TierDisplay.jsx
import React, { useEffect, useRef } from 'react';
import styles from './TierDisplay.module.css';
import MyAudioComponent from './Sfx'; // Import the audio component

const gradients = [
    { start: "#ef00ab", mid: "#201D1D", end: "#acfa70" }, // Purgatory
    { start: "#22045d", mid: "#c4f0f9", end: "#5b0063" }, // The Moon
    { start: "#11298b", mid: "#c4f0f9", end: "#F96C2F" }, // Mercury
    { start: "#ff9a9e", mid: "#fecfef", end: "#f0f0f0" }, // Venus
    { start: "#f6d365", mid: "#fda085", end: "#f0f0f0" }, // The Sun
    { start: "#ff4e50", mid: "#fc913a", end: "#f0f0f0" }, // Mars
    { start: "#e4626c", mid: "#547aca", end: "#f6f4f9" }, // Jupiter
    { start: "#0e8998", mid: "#fec19d", end: "#380155" }, // Saturn
    { start: "#cc2b5e", mid: "#753a88", end: "#f0f0f0" }, // Fixed Stars
    { start: "#000000", mid: "#ffffff", end: "#f0f0f0" }, // Primum Mobile
];

function TierDisplay({ totalClicks }) {
    const tiers = [
        { threshold: 0, description: "∅ Purgatory ∅" },
        { threshold: 111, description: "☽ The Moon: The Inconstant ☾" },
        { threshold: 2222, description: "☿ Mercury: The Ambitious ☿" },
        { threshold: 22222, description: "♀ Venus: The Lovers ♀" },
        { threshold: 333333, description: "☉ The Sun: The Wise ☉" },
        { threshold: 444444, description: "♂ Mars: The Warriors of the Faith ♂" },
        { threshold: 555555, description: "♃ Jupiter: The Just Rulers ♃" },
        { threshold: 6666666, description: "♄ Saturn: The Contemplatives ♄" },
        { threshold: 7777777, description: "₊˚⊹☆The Fixed Stars: Faith, Hope and Love☆⊹˚₊" },
        { threshold: 77777777, description: "⚥ The Primum Mobile: The Angels ⚥" },
    ];

    const audio = MyAudioComponent(); // Use it as a hook!
    const previousTier = useRef(0);

    let currentTier = 0;
    for (let i = 0; i < tiers.length; i++) {
        if (totalClicks >= tiers[i].threshold) {
            currentTier = i;
        } else {
            break;
        }
    }

    useEffect(() => {
        const root = document.documentElement;
        if (gradients[currentTier]) { // Check if gradient exists for this tier
            root.style.setProperty('--background-gradient-start', gradients[currentTier].start);
            root.style.setProperty('--background-gradient-mid', gradients[currentTier].mid);
            root.style.setProperty('--background-gradient-end', gradients[currentTier].end);
        }
        if (currentTier > 0 && currentTier !== previousTier.current) {
            if (audio && audio.playSound) {
                audio.playSound('tierUp');
                previousTier.current = currentTier;
            } else {
                console.error('Audio not available for tier up sound!');
            }
        }
    }, [currentTier, audio]); // Adding audio to the dependency array

    return (
        <div className={styles.tierDisplay}>
            <span className={styles.tierDescription}>{tiers[currentTier].description}</span> {/* Text wrapped in a span */}
        </div>
    );
}

export default TierDisplay;
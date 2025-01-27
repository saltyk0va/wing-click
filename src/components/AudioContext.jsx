import React, { createContext, useState, useEffect, useRef, useContext } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const audioRefs = { /* ... your audio refs */ };
    const [audioReady, setAudioReady] = useState(false);

    useEffect(() => {
        // Load audio files
        const loadAudio = async () => {
            try {
                for (const key in audioRefs) {
                    audioRefs[key].current = new Audio(`/sounds/${key}.mp3`);
                    if (key === 'background') {
                        audioRefs[key].current.loop = true;
                        audioRefs[key].current.volume = 0.5;
                        audioRefs[key].current.play();
                    }
                }
                setAudioReady(true); // Set audioReady to true after loading
            } catch (error) {
                console.error("Error loading audio:", error);
            }
        };

        loadAudio();

        return () => {
            for (const key in audioRefs) {
                if (audioRefs[key].current) {
                    audioRefs[key].current.pause();
                }
            }
        };
    }, []);

    const playSound = (soundName) => {
        if (audioReady && audioRefs[soundName] && audioRefs[soundName].current) {
            try {
                audioRefs[soundName].current.currentTime = 0;
                audioRefs[soundName].current.play();
            } catch (error) {
                console.error(`Error playing sound ${soundName}:`, error);
            }
        } else {
            console.warn(`Sound ${soundName} not ready or not found.`);
        }
    };

    const value = { playSound, audioReady }; // Provide playSound and audioReady

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
    return useContext(AudioContext);
};
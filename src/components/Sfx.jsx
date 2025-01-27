//sfx.sjx

import React, { useRef, useEffect } from 'react';

function MyAudioComponent() {
    const audioRefs = {
        click: useRef(null),
        tierUp: useRef(null),
        popupClose: useRef(null),
        background: useRef(null),
        clickValueUpgrade: useRef(null),
        autoClickerUpgrade: useRef(null),
    };

    useEffect(() => {
        for (const key in audioRefs) {
            try {
                audioRefs[key].current = new Audio(`/sounds/${key}.mp3`);
                if (key === 'background') {
                    audioRefs[key].current.loop = true;
                    audioRefs[key].current.volume = 0.5;
                    audioRefs[key].current.play();
                }
            } catch (error) {
                console.error(`Error loading sound ${key}:`, error);
            }
        }

        return () => {
            for (const key in audioRefs) {
                if (audioRefs[key].current) {
                    audioRefs[key].current.pause();
                }
            }
        };
    }, []);

    const playSound = (soundName) => {
        if (!audioRefs[soundName] || !audioRefs[soundName].current) {
            console.error(`Sound ${soundName} not loaded!`);
            return;
        }

        try {
            audioRefs[soundName].current.currentTime = 0;
            audioRefs[soundName].current.play();
        } catch (error) {
            console.error(`Error playing sound ${soundName}:`, error);
        }
    };

    return { playSound };
}

export default MyAudioComponent;

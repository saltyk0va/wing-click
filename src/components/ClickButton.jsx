import React, { useState, useRef, useEffect } from 'react';
import styles from './ClickButton.module.css';
import clickImage from '/wings.webp';
import MyAudioComponent from './Sfx'; // Import the audio component

function ClickButton({ onClick, clickValue, count }) {
  const [isClicked, setIsClicked] = useState(false);
  const featherContainerRef = useRef(null);
  const audio = MyAudioComponent(); // Create audio instance outside of render

  const glowIntensity = Math.min(count / 25, 50);
  const dropShadow = `0px 0px ${glowIntensity}px rgba(241, 243, 139, 0.99)`;

  const createFeathers = () => {
    if (!featherContainerRef.current) return;

    const numFeathers = 10; // Adjust the number of feathers
    const containerWidth = featherContainerRef.current.clientWidth;
    const containerHeight = featherContainerRef.current.clientHeight;

    for (let i = 0; i < numFeathers; i++) {
      const feather = document.createElement('div');
      feather.className = styles.feather;

      // More varied horizontal and vertical positions within the container
      feather.style.left = `${Math.random() * containerWidth}px`;
      feather.style.top = `${Math.random() * containerHeight}px`;

      feather.style.animationDelay = `${Math.random() * 0.7}s`;
      feather.style.transform = `rotate(${Math.random() * 360}deg)`;
      featherContainerRef.current.appendChild(feather);

      setTimeout(() => {
        feather.remove(); // Use feather.remove() for cleaner removal
      }, 1700);
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    createFeathers();
    setTimeout(() => setIsClicked(false), 300);
    // Play click audio on button click
    if (audio && audio.playSound) {
      audio.playSound('click'); // Assuming your audio component has a 'click' sound
    } else {
      console.error('Audio not available for click sound!');
    }
  };

  return (
    <div className={styles.clickableImageContainer} onClick={handleClick}>
      <div
        className={`${styles.imageWrapper} ${isClicked ? styles.clicked : ''}`}
        style={{ filter: `drop-shadow(${dropShadow})` }}
      >
        <img src={clickImage}
          alt="Click Me!"
          className={styles.clickableImage}
          draggable="false"
          style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }} />
      </div>
      <div className={styles.valueDisplay}>+{clickValue}</div>
      <div className={styles.featherContainer} ref={featherContainerRef} />
    </div>
  );
}

export default ClickButton;
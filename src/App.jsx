import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Counter from './components/Counter';
import ClickButton from './components/ClickButton';
import UpgradesSystem from './components/UpgradesSystem';
import TierDisplay from './components/TierDisplay'; // Import TierDisplay
import Popup from './components/Popup'
import MyAudioComponent from './components/Sfx'; // Import the audio component

function App() {
  const [count, setCount] = useState(0);
  const [showPopup, setShowPopup] = useState(true); // State to control popup visibility
  const audio = MyAudioComponent();
  const [totalClicks, setTotalClicks] = useState(0); // State for total clicks (independent of count)
  const [cps, setCps] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const initialClickValueCost = 19;
  const initialAutoClickerCost = 53;
  const localStorageKeyCount = 'myClickerGame_count'; // Use a more specific key
  const localStorageKeyTotalClicks = 'myClickerGame_totalClicks'; // Use a more specific key
  useEffect(() => {
    try {
      const storedCount = localStorage.getItem(localStorageKeyCount);
      if (storedCount) {
        setCount(parseInt(storedCount, 10));
      }

      const storedTotalClicks = localStorage.getItem(localStorageKeyTotalClicks);
      if (storedTotalClicks) {
        setTotalClicks(parseInt(storedTotalClicks, 10));
      }
    } catch (error) {
      console.error("Error loading from local storage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(localStorageKeyCount, count);
      localStorage.setItem(localStorageKeyTotalClicks, totalClicks);
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  }, [count, totalClicks]);

  const [upgradeCosts, setUpgradeCosts] = useState({
    clickValue: initialClickValueCost,
    autoClicker: initialAutoClickerCost,
  });
  const [lastPrimeCost, setLastPrimeCost] = useState({
    clickValue: initialClickValueCost,
    autoClicker: initialAutoClickerCost,
  });

  const handlePopupClose = () => {
    if (audio && audio.playSound) {
        audio.playSound('popupClose');
    }
    setShowPopup(false); // Update state to hide the popup
};

  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  const getNextPrime = (num) => {
    let nextNum = num + 1;
    while (!isPrime(nextNum)) {
      nextNum++;
    }
    return nextNum;
  };

  const [upgrades, setUpgrades] = useState([
    {
      id: 'clickValue',
      name: 'faster!!!',
      effect: () => setClickValue(prev => prev + 1),
    },
    {
      id: 'autoClicker',
      name: 'lazy',
      effect: () => setCps(prev => prev + 2),
    },
  ]);

  useEffect(() => {
    setUpgrades(prevUpgrades =>
      prevUpgrades.map((upgrade) => ({
        ...upgrade,
        cost: upgradeCosts[upgrade.id],
        disabled: count < upgradeCosts[upgrade.id],
      }))
    );
  }, [count, upgradeCosts]);

  const handleUpgrade = (upgrade) => {
    if (count >= upgrade.cost) {
      setCount(prevCount => prevCount - upgrade.cost);
      upgrade.effect();
      setUpgradeCosts(prevCosts => ({
        ...prevCosts,
        [upgrade.id]: getNextPrime(lastPrimeCost[upgrade.id]),
      }));
      setLastPrimeCost(prevLastPrime => ({
        ...prevLastPrime,
        [upgrade.id]: getNextPrime(prevLastPrime[upgrade.id]),
      }));
 
      // Play upgrade sound specific to the button
      if (audio && audio.playSound) {
        switch (upgrade.id) {
          case 'clickValue':
            audio.playSound('clickValueUpgrade');
            break;
          case 'autoClicker':
            audio.playSound('autoClickerUpgrade');
            break;
          default:
            console.warn(`Upgrade sound not defined for ${upgrade.id}`);
        }
      } else {
        console.error('Audio not available for upgrade sound!');
      }
    }
  };

  const handleClick = () => {
    setCount(prevCount => prevCount + clickValue);
    setTotalClicks(prevTotal => prevTotal + clickValue); // Increment totalClicks here
  };

  useEffect(() => {
    let intervalId;
    if (cps > 0) {
      intervalId = setInterval(() => {
        setCount(prevCount => prevCount + cps);
        setTotalClicks(prevTotal => prevTotal + cps); // Increment totalClicks here
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [cps]);


  return (
    <div className={styles.App}
    style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
  >
      {showPopup && <Popup onClose={handlePopupClose} />} {/* Conditional rendering */}
      <TierDisplay totalClicks={totalClicks} /> {/* Display the tier based on totalClicks */}
      <Counter count={count} totalClicks={totalClicks} /> {/* Pass totalClicks to Counter */}
      <ClickButton onClick={handleClick} clickValue={clickValue} count={count} />
      <UpgradesSystem upgrades={upgrades} onUpgrade={handleUpgrade} />
      <h1>angel:holic</h1>
    </div>
  );
}

export default App;
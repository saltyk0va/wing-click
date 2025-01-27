import React from 'react';
import Upgrade from './Upgrade';
import './UpgradesSystem.css'; // Import the CSS file

function UpgradesSystem({ upgrades, onUpgrade }) {
  return (
    <div className="upgrades-container">
      <h2 className="upgrades-title">꧁ঔৣ☬✞Spend your feathers✞☬ঔৣ꧂</h2>
      <div className="upgrades-list"> {/* New div for button layout */}
        {upgrades.map((upgrade) => (
          <Upgrade key={upgrade.id} upgrade={upgrade} onUpgrade={onUpgrade} />
        ))}
      </div>
    </div>
  );
}

export default UpgradesSystem;
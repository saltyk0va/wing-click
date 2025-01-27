import React from 'react';

function Upgrade({ upgrade, onUpgrade }) {
  return (
    <button
      className="upgrade-button"
      onClick={() => onUpgrade(upgrade)}
      disabled={upgrade.disabled}
    >
      {upgrade.name} (Cost: {upgrade.cost})
    </button>
  );
}

export default Upgrade;
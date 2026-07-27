import React from 'react';

export default function PlatformTabs({ platform, onSwitch }) {
  return (
    <div className="platform-tabs">
      <button
        className={`platform-tab ${platform === 'roku' ? 'active' : ''}`}
        onClick={() => onSwitch('roku')}
      >
        📺 Roku
      </button>
      <button
        className={`platform-tab ${platform === 'googletv' ? 'active' : ''}`}
        onClick={() => onSwitch('googletv')}
      >
        🎬 Google TV
      </button>
    </div>
  );
}

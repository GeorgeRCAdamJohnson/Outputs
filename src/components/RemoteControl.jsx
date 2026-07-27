import React from 'react';

export default function RemoteControl({ onCommand }) {
  const handleAction = (cmd) => {
    if (onCommand) onCommand(cmd);
  };

  return (
    <div className="remote-container">
      {/* Streaming Shortcuts */}
      <div className="shortcut-group">
        <button 
          className="pill pill-netflix" 
          onClick={() => handleAction('NETFLIX')}
        >
          Netflix
        </button>
        <button 
          className="pill pill-hulu" 
          onClick={() => handleAction('HULU')}
        >
          Hulu
        </button>
      </div>

      {/* Navigation D-Pad */}
      <div className="dpad-container">
        <button 
          className="dpad-btn dpad-up" 
          onClick={() => handleAction('UP')}
        >
          ▲
        </button>
        <button 
          className="dpad-btn dpad-down" 
          onClick={() => handleAction('DOWN')}
        >
          ▼
        </button>
        <button 
          className="dpad-btn dpad-left" 
          onClick={() => handleAction('LEFT')}
        >
          ◀
        </button>
        <button 
          className="dpad-btn dpad-right" 
          onClick={() => handleAction('RIGHT')}
        >
          ▶
        </button>
        <button 
          className="ok-button" 
          onClick={() => handleAction('SELECT')}
        >
          OK
        </button>
      </div>

      {/* Volume Control */}
      <div className="volume-section">
        <button className="vol-btn" onClick={() => handleAction('VOL_UP')}>
          Vol +
        </button>
        <button className="vol-btn" onClick={() => handleAction('VOL_DOWN')}>
          Vol -
        </button>
      </div>

      {/* Status Bar */}
      <div className="now-playing">
        <div style={{ fontSize: '0.8rem' }}>Now Playing: Cinematic Experience</div>
        <div className="progress-bar"></div>
      </div>
    </div>
  );
}

import React from 'react';

export default function RemoteControl({ onAction }) {
  const handlePress = (action) => {
    if (onAction) onAction(action);
  };

  return (
    <div className="remote-body">
      <div className="remote-header">
        <div className="brand-logo">ROKU</div>
      </div>

      <div className="dpad">
        <button className="direction" onClick={() => handlePress('up')}>▲</button>
        <button className="direction" onClick={() => handlePress('right')}>▶</button>
        <button className="direction" onClick={() => handlePress('down')}>▼</button>
        {/* Empty spaces in the 3x3 grid logic for layout purposes */}
        <div />
        <button className="rbtn ok" onClick={() => handlePress('ok')}>OK</button>
        <div />
      </div>

      <div className="remote-controls">
        <button className="rbtn" onClick={() => handlePress('back')}>↶</button>
        <button className="rbtn" onClick={() => handlePress('play_pause')}>⏯</button>
        <button className="rbtn" onClick={() => handlePress('home')}>⌂</button>
      </div>

      <div className="remote-bottom">
        <button className="rbtn" onClick={() => handlePress('mute')}>🔇</button>
        <button className="rbtn" onClick={() => handlePress('mic')}>🎙</button>
      </div>
    </div>
  );
}

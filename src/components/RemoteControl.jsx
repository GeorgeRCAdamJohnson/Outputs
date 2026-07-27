// Premium Roku Remote — designed in Pencil, exported to React
import React, { useCallback, useState } from 'react';

function RemoteButton({ children, command, onPress, className = '', style = {} }) {
  const [pressed, setPressed] = useState(false);
  const handleClick = useCallback(() => {
    setPressed(true);
    onPress(command);
    setTimeout(() => setPressed(false), 150);
  }, [command, onPress]);

  return (
    <button
      className={`rbtn ${className} ${pressed ? 'pressed' : ''}`}
      style={style}
      onClick={handleClick}
      aria-label={command}
    >
      {children}
    </button>
  );
}

export default function RemoteControl({ onCommand, connected, deviceInfo }) {
  const press = useCallback((cmd) => {
    if (connected) onCommand(cmd);
  }, [onCommand, connected]);

  return (
    <div className="remote-body">
      {/* Now Playing */}
      <div className="now-playing">
        <span className="status-led"></span>
        <span className="device-label">{deviceInfo?.name || 'Not Connected'}</span>
        <span className="app-label">{connected ? 'Ready' : '—'}</span>
      </div>

      {/* Power Row */}
      <div className="power-row">
        <RemoteButton command="power" onPress={press} className="power-btn">⏻</RemoteButton>
        <span className="roku-label">ROKU</span>
        <RemoteButton command="search" onPress={press} className="mic-btn">🎙</RemoteButton>
      </div>

      {/* D-Pad */}
      <div className="dpad">
        <RemoteButton command="up" onPress={press} className="dpad-arrow dpad-up">▲</RemoteButton>
        <RemoteButton command="left" onPress={press} className="dpad-arrow dpad-left">◀</RemoteButton>
        <RemoteButton command="select" onPress={press} className="dpad-ok">OK</RemoteButton>
        <RemoteButton command="right" onPress={press} className="dpad-arrow dpad-right">▶</RemoteButton>
        <RemoteButton command="down" onPress={press} className="dpad-arrow dpad-down">▼</RemoteButton>
      </div>

      {/* Nav Buttons */}
      <div className="nav-row">
        <RemoteButton command="back" onPress={press} className="nav-btn">← Back</RemoteButton>
        <RemoteButton command="home" onPress={press} className="nav-btn">⌂ Home</RemoteButton>
        <RemoteButton command="info" onPress={press} className="nav-btn">★ Info</RemoteButton>
      </div>

      {/* Media Transport */}
      <div className="media-row">
        <RemoteButton command="rev" onPress={press} className="media-btn">⏪</RemoteButton>
        <RemoteButton command="play" onPress={press} className="media-btn play-btn">▶</RemoteButton>
        <RemoteButton command="fwd" onPress={press} className="media-btn">⏩</RemoteButton>
      </div>

      {/* Volume + Channel */}
      <div className="vol-row">
        <div className="rocker">
          <RemoteButton command="volumeUp" onPress={press} className="rocker-btn">+</RemoteButton>
          <RemoteButton command="mute" onPress={press} className="rocker-btn mute-btn">🔇</RemoteButton>
          <RemoteButton command="volumeDown" onPress={press} className="rocker-btn">−</RemoteButton>
        </div>
        <div className="rocker rocker-sm">
          <RemoteButton command="channelUp" onPress={press} className="rocker-btn">CH+</RemoteButton>
          <RemoteButton command="channelDown" onPress={press} className="rocker-btn">CH−</RemoteButton>
        </div>
      </div>

      {/* Streaming Shortcuts */}
      <div className="shortcuts-row">
        <RemoteButton command="inputHDMI1" onPress={press} className="shortcut-pill" style={{background:'#E50914'}}>Netflix</RemoteButton>
        <RemoteButton command="inputHDMI2" onPress={press} className="shortcut-pill" style={{background:'#1CE783'}}>Hulu</RemoteButton>
        <RemoteButton command="inputHDMI3" onPress={press} className="shortcut-pill" style={{background:'#00A8E1'}}>Prime</RemoteButton>
        <RemoteButton command="inputTuner" onPress={press} className="shortcut-pill" style={{background:'#FF0000'}}>YouTube</RemoteButton>
      </div>
    </div>
  );
}

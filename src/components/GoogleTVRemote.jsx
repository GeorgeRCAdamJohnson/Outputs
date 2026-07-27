import React, { useCallback, useState } from 'react';

function GtvButton({ children, command, onPress, className = '', style = {} }) {
  const [pressed, setPressed] = useState(false);
  const handleClick = useCallback(() => {
    setPressed(true);
    onPress(command);
    setTimeout(() => setPressed(false), 150);
  }, [command, onPress]);
  return (
    <button className={`rbtn ${className} ${pressed ? 'pressed' : ''}`} style={style} onClick={handleClick} aria-label={command}>
      {children}
    </button>
  );
}

export default function GoogleTVRemote({ onCommand, connected, deviceInfo }) {
  const press = useCallback((cmd) => { if (connected) onCommand(cmd); }, [onCommand, connected]);

  return (
    <div className="remote-body gtv-body">
      <div className="now-playing">
        <span className="status-led" style={{background:'#4285F4',boxShadow:'0 0 6px #4285F4'}}></span>
        <span className="device-label">{deviceInfo?.name || 'Not Connected'}</span>
        <span className="app-label">{connected ? 'Google TV' : '—'}</span>
      </div>
      <div className="power-row">
        <GtvButton command="power" onPress={press} className="power-btn">⏻</GtvButton>
        <span className="roku-label" style={{letterSpacing:'1px'}}>Google TV</span>
        <GtvButton command="assistant" onPress={press} className="assistant-btn">G</GtvButton>
      </div>
      <div className="dpad">
        <GtvButton command="up" onPress={press} className="dpad-arrow dpad-up">▲</GtvButton>
        <GtvButton command="left" onPress={press} className="dpad-arrow dpad-left">◀</GtvButton>
        <GtvButton command="select" onPress={press} className="dpad-ok gtv-ok">OK</GtvButton>
        <GtvButton command="right" onPress={press} className="dpad-arrow dpad-right">▶</GtvButton>
        <GtvButton command="down" onPress={press} className="dpad-arrow dpad-down">▼</GtvButton>
      </div>
      <div className="nav-row">
        <GtvButton command="back" onPress={press} className="nav-btn">← Back</GtvButton>
        <GtvButton command="home" onPress={press} className="nav-btn">○ Home</GtvButton>
        <GtvButton command="recents" onPress={press} className="nav-btn">◻ Recent</GtvButton>
      </div>
      <div className="media-row">
        <GtvButton command="rev" onPress={press} className="media-btn">⏪</GtvButton>
        <GtvButton command="play" onPress={press} className="media-btn play-btn gtv-play">▶</GtvButton>
        <GtvButton command="fwd" onPress={press} className="media-btn">⏩</GtvButton>
      </div>
      <div className="vol-row">
        <div className="rocker">
          <GtvButton command="volumeUp" onPress={press} className="rocker-btn">+</GtvButton>
          <GtvButton command="mute" onPress={press} className="rocker-btn mute-btn">🔇</GtvButton>
          <GtvButton command="volumeDown" onPress={press} className="rocker-btn">−</GtvButton>
        </div>
        <div className="gtv-extras">
          <GtvButton command="guide" onPress={press} className="gtv-extra-btn">📺 Guide</GtvButton>
          <GtvButton command="ambient" onPress={press} className="gtv-extra-btn">✨ Ambient</GtvButton>
          <GtvButton command="input" onPress={press} className="gtv-extra-btn">⇥ Input</GtvButton>
        </div>
      </div>
      <div className="shortcuts-row">
        <GtvButton command="youtube" onPress={press} className="shortcut-pill" style={{background:'#FF0000'}}>YouTube</GtvButton>
        <GtvButton command="netflix" onPress={press} className="shortcut-pill" style={{background:'#E50914'}}>Netflix</GtvButton>
        <GtvButton command="disney" onPress={press} className="shortcut-pill" style={{background:'#113CCF'}}>Disney+</GtvButton>
        <GtvButton command="spotify" onPress={press} className="shortcut-pill" style={{background:'#1DB954'}}>Spotify</GtvButton>
      </div>
    </div>
  );
}

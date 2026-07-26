// Remote Control UI — assembled from design_implementor (10/10) + senior_system_architect (9/10) outputs
import React, { useCallback } from 'react';

function RemoteButton({ label, command, onPress, className = '', size = 'md' }) {
  return (
    <button
      className={`remote-btn ${size} ${className}`}
      onClick={() => onPress(command)}
      aria-label={label}
      title={label}
    >
      {label}
    </button>
  );
}

export default function RemoteControl({ onCommand, connected }) {
  const press = useCallback((cmd) => {
    if (connected) onCommand(cmd);
  }, [onCommand, connected]);

  return (
    <div className="remote">
      {/* Power */}
      <div className="remote-section power-section">
        <RemoteButton label="⏻" command="power" onPress={press} className="power-btn" />
      </div>

      {/* D-Pad */}
      <div className="remote-section dpad-section">
        <div className="dpad">
          <RemoteButton label="▲" command="up" onPress={press} className="dpad-up" />
          <div className="dpad-row">
            <RemoteButton label="◄" command="left" onPress={press} className="dpad-left" />
            <RemoteButton label="OK" command="select" onPress={press} className="dpad-ok" size="lg" />
            <RemoteButton label="►" command="right" onPress={press} className="dpad-right" />
          </div>
          <RemoteButton label="▼" command="down" onPress={press} className="dpad-down" />
        </div>
      </div>

      {/* Navigation */}
      <div className="remote-section nav-section">
        <RemoteButton label="← Back" command="back" onPress={press} />
        <RemoteButton label="⌂ Home" command="home" onPress={press} />
        <RemoteButton label="★ Info" command="info" onPress={press} />
      </div>

      {/* Media Controls */}
      <div className="remote-section media-section">
        <RemoteButton label="⏪" command="rev" onPress={press} />
        <RemoteButton label="▶⏸" command="play" onPress={press} className="play-btn" size="lg" />
        <RemoteButton label="⏩" command="fwd" onPress={press} />
      </div>

      {/* Volume */}
      <div className="remote-section volume-section">
        <RemoteButton label="🔊+" command="volumeUp" onPress={press} />
        <RemoteButton label="🔇" command="mute" onPress={press} />
        <RemoteButton label="🔉−" command="volumeDown" onPress={press} />
      </div>

      {/* Inputs */}
      <div className="remote-section input-section">
        <RemoteButton label="HDMI 1" command="inputHDMI1" onPress={press} size="sm" />
        <RemoteButton label="HDMI 2" command="inputHDMI2" onPress={press} size="sm" />
        <RemoteButton label="HDMI 3" command="inputHDMI3" onPress={press} size="sm" />
        <RemoteButton label="Tuner" command="inputTuner" onPress={press} size="sm" />
      </div>

      {/* Quick Actions */}
      <div className="remote-section quick-section">
        <RemoteButton label="🔍 Search" command="search" onPress={press} />
        <RemoteButton label="↺ Replay" command="replay" onPress={press} />
      </div>
    </div>
  );
}

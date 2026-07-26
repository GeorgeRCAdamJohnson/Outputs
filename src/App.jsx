import React, { useState, useCallback } from 'react';
import RemoteControl from './components/RemoteControl';
import DeviceConnect from './components/DeviceConnect';
import { rokuService } from './services/rokuService';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

export default function App() {
  const [connected, setConnected] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [lastCommand, setLastCommand] = useState(null);

  const handleConnect = async (ip) => {
    rokuService.setDevice(ip);
    const info = await rokuService.getDeviceInfo();
    if (info) {
      setDeviceInfo(info);
      setConnected(true);
    } else {
      // Still set connected — device may not respond to info query over CORS
      setDeviceInfo({ name: `Roku @ ${ip}`, model: 'Unknown', serial: '' });
      setConnected(true);
    }
  };

  const handleCommand = useCallback(async (command) => {
    setLastCommand(command);
    await rokuService.sendKey(command);
    setTimeout(() => setLastCommand(null), 300);
  }, []);

  useKeyboardShortcuts(handleCommand);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📺 Roku Remote</h1>
        {lastCommand && <span className="command-flash">{lastCommand}</span>}
      </header>
      <main className="app-main">
        <DeviceConnect
          onConnect={handleConnect}
          deviceInfo={deviceInfo}
          connected={connected}
        />
        <RemoteControl onCommand={handleCommand} connected={connected} />
      </main>
    </div>
  );
}

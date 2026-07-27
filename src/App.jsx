import React, { useState, useCallback } from 'react';
import RemoteControl from './components/RemoteControl';
import GoogleTVRemote from './components/GoogleTVRemote';
import DeviceConnect from './components/DeviceConnect';
import PlatformTabs from './components/PlatformTabs';
import { rokuService } from './services/rokuService';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

export default function App() {
  const [connected, setConnected] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [lastCommand, setLastCommand] = useState(null);
  const [platform, setPlatform] = useState('roku');

  const handleConnect = async (ip) => {
    rokuService.setDevice(ip);
    const info = await rokuService.getDeviceInfo();
    if (info) {
      setDeviceInfo(info);
      setConnected(true);
    } else {
      setDeviceInfo({ name: `Device @ ${ip}`, model: 'Unknown', ip });
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
        <h1>📺 Universal Remote</h1>
        {lastCommand && <span className="command-flash">{lastCommand}</span>}
      </header>
      <main className="app-main">
        <PlatformTabs platform={platform} onSwitch={setPlatform} />
        <DeviceConnect onConnect={handleConnect} deviceInfo={deviceInfo} connected={connected} />
        {platform === 'roku' ? (
          <RemoteControl onCommand={handleCommand} connected={connected} deviceInfo={deviceInfo} />
        ) : (
          <GoogleTVRemote onCommand={handleCommand} connected={connected} deviceInfo={deviceInfo} />
        )}
      </main>
    </div>
  );
}

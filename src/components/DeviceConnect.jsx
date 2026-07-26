// Device connection panel — auto-discovery + manual fallback
import React, { useState } from 'react';
import { useDeviceDiscovery } from '../hooks/useDeviceDiscovery';

export default function DeviceConnect({ onConnect, deviceInfo, connected }) {
  const [manualIp, setManualIp] = useState('');
  const [loading, setLoading] = useState(false);
  const { devices, loading: discovering, error, forceDiscover } = useDeviceDiscovery();

  const handleConnect = async (ip) => {
    setLoading(true);
    await onConnect(ip);
    setLoading(false);
  };

  const handleManualConnect = (e) => {
    e.preventDefault();
    if (manualIp.trim()) handleConnect(manualIp.trim());
  };

  return (
    <div className="device-panel">
      <h2>📺 Connect to Roku</h2>

      {connected && deviceInfo ? (
        <div className="device-info">
          <div className="device-status connected">● Connected</div>
          <div className="device-name">{deviceInfo.name}</div>
          <div className="device-meta">{deviceInfo.model} • {deviceInfo.ip || deviceInfo.serial}</div>
        </div>
      ) : (
        <>
          {/* Auto-discovered devices */}
          <div className="discovery-section">
            <div className="discovery-header">
              <span className="discovery-label">
                {discovering ? '🔍 Scanning...' : `📡 Found ${devices.length} device${devices.length !== 1 ? 's' : ''}`}
              </span>
              <button className="scan-btn" onClick={forceDiscover} disabled={discovering}>
                ↻ Scan
              </button>
            </div>

            {devices.length > 0 && (
              <div className="device-list">
                {devices.map((device, i) => (
                  <button
                    key={device.ip || i}
                    className="device-item"
                    onClick={() => handleConnect(device.ip)}
                    disabled={loading}
                  >
                    <div className="device-item-name">{device.name}</div>
                    <div className="device-item-meta">{device.model} • {device.ip}</div>
                  </button>
                ))}
              </div>
            )}

            {error && !devices.length && (
              <div className="discovery-error">
                Discovery server offline. Start with: <code>cd server && npm start</code>
              </div>
            )}
          </div>

          {/* Manual IP fallback */}
          <div className="manual-section">
            <form onSubmit={handleManualConnect} className="connect-form">
              <input
                type="text"
                value={manualIp}
                onChange={(e) => setManualIp(e.target.value)}
                placeholder="Manual IP (e.g. 192.168.1.100)"
                className="ip-input"
                disabled={loading}
              />
              <button type="submit" className="connect-btn" disabled={loading || !manualIp.trim()}>
                {loading ? '...' : 'Connect'}
              </button>
            </form>
          </div>
        </>
      )}

      <div className="shortcut-hint">
        <small>Keyboard: Arrows=Navigate, Enter=Select, Space=Play, +/-=Volume, M=Mute</small>
      </div>
    </div>
  );
}

// Auto-discovery hook — polls the local discovery server for Roku devices
import { useState, useEffect, useCallback } from 'react';

const DISCOVERY_URL = 'http://localhost:3001';

export function useDeviceDiscovery(pollInterval = 10000) {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDevices = useCallback(async () => {
    try {
      const res = await fetch(`${DISCOVERY_URL}/api/devices`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setDevices(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const forceDiscover = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${DISCOVERY_URL}/api/discover`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setDevices(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(fetchDevices, pollInterval);
    return () => clearInterval(interval);
  }, [fetchDevices, pollInterval]);

  return { devices, loading, error, forceDiscover };
}

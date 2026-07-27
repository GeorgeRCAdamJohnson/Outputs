/**
 * Google TV Service
 * Implements the same interface as rokuService for seamless integration.
 */
let currentDevice = null;

export const googleTvService = {
  setDevice: (ip) => {
    currentDevice = { ip, name: `Google TV (${ip})`, model: 'Google TV' };
    console.log(`Google TV connected to ${ip}`);
    return true;
  },

  getDeviceInfo: async () => {
    // Simulate API fetch for Google TV info
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(currentDevice || { name: 'Unknown Google TV', model: 'Generic', ip: '0.0.0.0' });
      }, 500);
    });
  },

  sendKey: async (command) => {
    if (!currentDevice) {
      console.error('No device connected');
      return false;
    }

    // Google TV uses port 6466 for ADB commands
    const url = `http://${currentDevice.ip}:6466`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'keyevent',
          key: command
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log(`Sent ${command} to Google TV at ${currentDevice.ip}`);
      return true;
    } catch (error) {
      console.error('Failed to send command to Google TV:', error);
      return false;
    }
  },
};

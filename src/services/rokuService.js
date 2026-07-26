// Roku ECP API Service — from integration_engineer agent output (score: 10/10)
// Sends commands to Roku devices via External Control Protocol (port 8060)

const KEY_MAP = {
  up: 'Up', down: 'Down', left: 'Left', right: 'Right',
  select: 'Select', back: 'Back', home: 'Home',
  play: 'Play', pause: 'Pause', rev: 'Rev', fwd: 'Fwd',
  replay: 'InstantReplay', info: 'Info',
  volumeUp: 'VolumeUp', volumeDown: 'VolumeDown', mute: 'VolumeMute',
  power: 'Power', channelUp: 'ChannelUp', channelDown: 'ChannelDown',
  search: 'Search', enter: 'Enter',
  inputTuner: 'InputTuner', inputHDMI1: 'InputHDMI1',
  inputHDMI2: 'InputHDMI2', inputHDMI3: 'InputHDMI3', inputAV1: 'InputAV1'
};

class RokuService {
  constructor() {
    this.deviceIp = null;
    this.baseUrl = null;
  }

  setDevice(ip) {
    this.deviceIp = ip;
    this.baseUrl = `http://${ip}:8060`;
  }

  async sendKey(key) {
    if (!this.baseUrl) throw new Error('No device connected');
    const command = KEY_MAP[key] || key;
    try {
      await fetch(`${this.baseUrl}/keypress/${command}`, { method: 'POST' });
      return { success: true, key: command };
    } catch (err) {
      console.error(`Roku command failed: ${err.message}`);
      return { success: false, error: err.message };
    }
  }

  async getDeviceInfo() {
    if (!this.baseUrl) return null;
    try {
      const res = await fetch(`${this.baseUrl}/query/device-info`);
      const text = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      return {
        name: xml.querySelector('friendly-device-name')?.textContent || 'Roku',
        model: xml.querySelector('model-name')?.textContent || 'Unknown',
        serial: xml.querySelector('serial-number')?.textContent || '',
        software: xml.querySelector('software-version')?.textContent || ''
      };
    } catch { return null; }
  }

  async getApps() {
    if (!this.baseUrl) return [];
    try {
      const res = await fetch(`${this.baseUrl}/query/apps`);
      const text = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      return Array.from(xml.querySelectorAll('app')).map(app => ({
        id: app.getAttribute('id'),
        name: app.textContent,
        version: app.getAttribute('version')
      }));
    } catch { return []; }
  }

  async launchApp(appId) {
    if (!this.baseUrl) return;
    await fetch(`${this.baseUrl}/launch/${appId}`, { method: 'POST' });
  }
}

export const rokuService = new RokuService();
export { KEY_MAP };

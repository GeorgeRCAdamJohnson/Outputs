// Keyboard shortcut hook — from senior_system_architect agent output (score: 9/10)
import { useEffect } from 'react';

const SHORTCUT_MAP = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Enter: 'select',
  Backspace: 'back',
  Home: 'home',
  ' ': 'play',
  'p': 'pause',
  '+': 'volumeUp',
  '=': 'volumeUp',
  '-': 'volumeDown',
  'm': 'mute',
  'r': 'rev',
  'f': 'fwd',
  'i': 'info',
  's': 'search'
};

export function useKeyboardShortcuts(onCommand) {
  useEffect(() => {
    function handleKey(e) {
      const command = SHORTCUT_MAP[e.key];
      if (command && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        onCommand(command);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onCommand]);
}

export { SHORTCUT_MAP };

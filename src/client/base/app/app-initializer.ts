import config from 'react-global-configuration';
import { defaultConfig } from '../../config/default';

export function initConfig() {
  const initialConfig = JSON.parse(document!.getElementById('initial-config')!.getAttribute('data-json')!);
  Object.assign(defaultConfig, initialConfig);
  Object.assign(defaultConfig, {
    protocol: (('https:' == document.location.protocol) ? 'https' : 'http'),
    host: location.host
  });
  config.set(defaultConfig);
}

export function getInitialState() {
  return JSON.parse(document!.getElementById('initial-data')!.getAttribute('data-json')!);
}

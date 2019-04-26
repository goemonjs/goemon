import util from 'util';
import { envs } from '../../env';

/**
 * Detect dev environment
 *
 * @returns boolean (if env is 'development' then returns true or not)
 */
export function isProductionMode() {
  return ( envs.NODE_ENV.value == 'production' ) ? true : false;
}

/**
 * Detect dev environment
 *
 * @returns boolean (if env is 'development' then returns true or not)
 */
export function isDevMode() {
  return ( envs.NODE_ENV.value == undefined || envs.NODE_ENV.value == 'developmemt' ) ? true : false;
}

/**
 * Detect test environment
 *
 * @returns boolean (if env is 'test' then returns true or not)
 */
export function isTestMode() {
  return ( envs.NODE_ENV.value == 'test' ) ? true : false;
}

/**
 * output debug information
 *
 * @param target  Target object
 * @returns    string
 */
export function vardump(target: any): string {
  return util.inspect(target, { showHidden: true, showProxy: true, depth: 10 });
}

import * as util from 'util';

/**
 * Detect dev environment
 *
 * @returns boolean (if env is 'development' then returns true or not)
 */
export function isDevMode() {
  return ( process.env.NODE_ENV === 'development' ) ? true : false;
}

/**
 * Detect test environment
 *
 * @returns boolean (if env is 'test' then returns true or not)
 */
export function isTestMode() {
  return ( process.env.NODE_ENV === 'test' ) ? true : false;
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

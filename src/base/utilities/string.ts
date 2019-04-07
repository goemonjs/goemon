/**
 * cut strings to specified length
 *
 * @param txt  text data
 * @param len  max length allowed
 * @param sub  suffix
 * @returns    string
 */
export function strcut(txt: string, len: number, sub: string = '...') {
  let str = txt;

  if (len < 0) {
    len = 0;
  }
  if (txt && txt.length > len) {
    str = txt.substr(0, len) + sub;
  }

  return str;
}

/**
 * strip trailing slashes of both left and right side like PHP 'trim'
 *
 * @param str  string data
 * @returns    string
 */
export function trimSlash(str: string): string {
  return str ? str.split('/').filter( x => x !== '' ).join('/') : '';
}

/**
 * strip trailing slashes of left side like PHP 'ltrim'
 *
 * @param str  string data
 * @returns    string
 */
export function trimLeftSlash(str: string): string {
  if (!str || str.length < 1) {
    return '';
  }

  let i = 0;
  while (str.charCodeAt(i) === 47 && ++i) {} // code 47 = '/'

  return str.slice(i);
}

/**
 * strip trailing slashes of right side like PHP 'rtrim'
 *
 * @param str  string data
 * @returns    string
 */
export function trimRightSlash(str: string): string {
  return str ? str.replace(/^(.+?)\/*?$/, '$1') : '';
}

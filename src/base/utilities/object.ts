import * as util from 'util';

/**
 * determine if a (nested) property is set
 *
 * @param fn  callback which returns nested object
 * @returns    boolean
 */
export function isSet(fn): boolean {
  let val;

  try {
    val = fn();
  } catch (e) {
    val = undefined;
  } finally {
    return val !== undefined;
  }
}

/**
 * get element of object
 *
 * @param data    Target object
 * @param key     Target key
 * @param defval  Fallback return value
 * @returns    any
 */
export function element(data: any, key: any, defval: any = void 0): any {
  if (!isSet( () => data[key] )) {
    return defval;
  }
  return data[key];
}

/**
 * get the integer value of a string
 *
 * @param str Target string
 * @returns    number
 */
export function intval(str: string): number {
  let val = parseInt(str);
  return (val !== NaN) ? val : 0;
}

/**
 * detect class name
 *
 * detect object instance's class name
 *
 * @param ins  any  data instance
 * @returns    string
 */
export function getClassname(ins: any): string {
  return isSet( () => ins.constructor.name ) ? ins.constructor.name : '';
}

/**
 * detect variable type
 *
 * detect variable type (array | hash-array | function | boolean | number | string | null | undefined)
 *
 * @param ins  any  data
 * @returns    string
 */
export function detectType(ins: any): string {
  let test: string = util.inspect(ins);
  let spec: string;

  switch (test.substr(0, 2)) {
    case '[]':
    case '[ ':
      spec = 'array';
      break;

    case '{}':
    case '{ ':
      spec = 'hash-array';
      break;

    case '[F':
      spec = test.slice(11, -1);
      spec = ['Boolean', 'Number', 'String'].includes(spec) ? spec.toLowerCase() : 'function';
      break;

    case 'null':
    case 'undefined':
      spec = test;
      break;

    default:
      spec = typeof ins;
      break;
  }

  return spec;
}

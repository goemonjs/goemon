import querystring from 'querystring';

interface IGlobalFetch {
  fetch: GlobalFetch;
}
declare var global: NodeJS.Global & IGlobalFetch;

if (!global.fetch) {
  global.fetch = require('node-fetch');
}

/**
 * build HTTP query string
 *
 * @param params   object                     params object to convert to query string
 * @param encoder  function|false|undefined   The function to use when converting URL-unsafe characters to percent-encoding in the query string
 * @returns   string
 */
export function buildHttpQuery(params: { [key: string]: any }, encoder: any = null) {
  let opts: any;

  if (encoder === false) {
    opts = { encodeURIComponent: v => v };
  } else if (encoder && typeof encoder == 'function') {
    opts = { encodeURIComponent: encoder };
  }

  return querystring.stringify(params, undefined, undefined, opts);
}

export async function doGet<T>(url: string): Promise<T> {
  const apiResult = await fetch(url, {
    method: 'get',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (apiResult.status != 200) {
    throw new Error('Failed to call ' + url);
  }

  return apiResult.json();
}

export async function doPost<T>(url: string): Promise<T> {
  const apiResult = await fetch(url, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (apiResult.status != 200) {
    throw new Error('Failed to call ' + url);
  }

  return apiResult.json();
}

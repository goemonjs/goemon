import fetch from 'node-fetch';

export async function doPost<T>(path: string): Promise<T> {
  const url = this.baseUrl + path;
  const apiResult = await fetch(url, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if ( apiResult.status != 200 ) {
    throw new Error('Failed to call ' + url);
  }

  return apiResult.json();
}

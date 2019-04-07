/**
 * sleep
 *
 * @param milliseconds  sleep time in milliseconds
 * @returns    Promise<void>
 */
export async function sleep(milliseconds: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), milliseconds);
  });
}

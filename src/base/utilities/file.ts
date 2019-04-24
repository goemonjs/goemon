import * as fs from 'fs';

export function generateNumberFromTimestamp(path: string) {
  let jsStats = fs.statSync(path);
  return jsStats.mtime.getFullYear() + jsStats.mtime.getMonth() + jsStats.mtime.getDay() + jsStats.mtime.getTime();
}

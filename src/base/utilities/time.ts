import moment from 'moment-timezone';

/**
 * get localed timestamp
 *
 * @param tz            string  IANA time zone
 * @param date          string|Moment|undefined timestamp
 * @param outputFormat  string  output format for moment
 * @param inputFormat   string  input format for moment (optional)
 * @param returnRaw     boolean flag whether return Moment object or not (optional)
 *
 * @returns    string|moment.Moment|null
 */
export function getLocaleTimestamp(tz: string, date: string | Date | undefined, outputFormat: string, inputFormat?: string, returnRaw: boolean = false) {
  let result: string | moment.Moment | null;

  try {
    // input check
    if (!moment.tz.zone(tz)) {
      throw new Error();
    }

    // generate timestamp|Date object
    let mom: moment.Moment = moment(date, inputFormat);

    if (!mom.isValid()) {
      throw new Error();
    }
    mom = mom.tz(tz);

    result = !returnRaw ? mom.format(outputFormat) : mom;
  }
  catch (err) {
    result = !returnRaw ? '' : null;
  }

  return result;
}

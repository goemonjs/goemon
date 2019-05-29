import i18next from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import BrowserLanguageDetector from 'i18next-browser-languagedetector';
import i18nextExpressMiddleware from 'i18next-express-middleware';
import enGuestRes from './en/guest.json';
import jsGuestRes from './ja/guest.json';
import { isClientSide } from '../base/utilities/utils';

// import jaLocale from 'date-fns/locale/ja';
// import enLocale from 'date-fns/locale/en';

let options: i18next.InitOptions = {
  resources: {
    en: {
      translation: enGuestRes
    },
    ja: {
      translation: jsGuestRes
    }
  },
  keySeparator: false, // we do not use keys in form messages.welcome
  interpolation: {
    format: function(value, format, lng) {
      if (format === 'uppercase') {
       return value.toUpperCase();
      }
      if ( value instanceof Date) {
        return moment(value).format(format);
      }
      return value;
    },
    escapeValue: false // react already safes from xss
  },
  // fallbackLng: ['en']      // Comment out if you want to use fallbackLng
};

if (isClientSide()) { // Check whether this method is called on client or server
  //
  // Browser side
  //
  Object.assign(options, {

    detection : {
      order: ['querystring', 'cookie', 'navigator'],
      lookupQuerystring: 'lng',
      lookupCookie: 'lng',
      caches: false, // ['cookie']
    }
  });

  i18next
  .use(BrowserLanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(options);
} else {
  //
  // Server side
  //
  Object.assign(options, {
    // whitelist: ['en', 'ja'],       // Comment out if you want to use fallbackLng
    detection : {
      order: [/*'path', 'session', */ 'querystring', 'cookie', 'header'],
      lookupQuerystring: 'lng',
      lookupCookie: 'lng',
      lookupHeader: 'accept-language',
      caches: ['cookie'],
    },
    // lng: 'en',   // Comment out when fix language
    // preload: ['en'],
  });

  i18next
  .use(i18nextExpressMiddleware.LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(options);
}

// export const localeFormatMap = {
//   en: enLocale,
//   ja: jaLocale,
// };

export default i18next;

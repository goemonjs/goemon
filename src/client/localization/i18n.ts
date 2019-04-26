import i18next from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import BrowserLanguageDetector from 'i18next-browser-languagedetector';
import i18nextExpressMiddleware from 'i18next-express-middleware';
import enGuestRes from './en/guest.json';
import jsGuestRes from './ja/guest.json';

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
  // lng: 'en',   // Comment out when fix language
  // fallbackLng: 'en',
  preload: ['en'],
};

if ( typeof window !== 'undefined' ) { // Check whether this method is called on client or server
  //
  // Browser side
  //
  Object.assign(options, {
    detection : {
      order: ['querystring', 'cookie', /*'localStorage'*/, 'navigator', /*'htmlTag', 'path', 'subdomain'*/],
      lookupQuerystring: 'locale',
      lookupCookie: 'lng',
      caches: ['cookie'],
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
    detection : {
      order: [/*'path', 'session', */ 'querystring', 'cookie', 'header'],
      lookupQuerystring: 'locale',
      lookupCookie: 'lng',
      lookupHeader: 'accept-language',
      caches: ['cookie'],
    }
  });

  i18next
  .use(i18nextExpressMiddleware.LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(options);
}

export default i18next;

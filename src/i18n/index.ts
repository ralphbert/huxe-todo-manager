import { createI18n } from 'vue-i18n';
import en from './en.json';
import de from './de.json';

export const availableLocales = ['de', 'en'];

export const i18n = createI18n({
  // something vue-i18n options here ...
  messages: {
    en,
    de,
  },
  availableLocales,
  fallbackLocale: 'en',
  locale: 'en',
  legacy: false,
});

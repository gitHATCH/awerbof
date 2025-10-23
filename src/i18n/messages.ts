import en from './locales/en';
import es from './locales/es';
import pt from './locales/pt';

export type Locale = 'es' | 'en' | 'pt';

export type MessagesDictionary = Record<string, string>;

export const defaultLocale: Locale = 'es';

export const messages: Record<Locale, MessagesDictionary> = {
  es,
  en,
  pt,
};

export const availableLocales: Locale[] = ['es', 'en', 'pt'];

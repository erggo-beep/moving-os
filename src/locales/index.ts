import { useState } from 'react';
import { en } from './en';

type Locale = 'en';

const translations = {
  en,
};

export function useTranslation() {
  const [locale] = useState<Locale>('en');

  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    return (value as string) || fallback || key;
  };

  return { t, locale };
}

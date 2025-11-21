import { useState } from 'react';

type Locale = 'en';

export function useTranslation(translations: Record<Locale, any>) {
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

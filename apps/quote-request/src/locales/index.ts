import { useTranslation as useTranslationBase } from '@moving-company/hooks';
import { en } from './en';

const translations = {
  en,
};

export function useTranslation() {
  return useTranslationBase(translations);
}

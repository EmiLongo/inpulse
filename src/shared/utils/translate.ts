// src/shared/utils/translate.ts

import { translations, useLanguageStore } from '@stores/languageStore';



export const useTranslate = () => {
  const language = useLanguageStore((state) => state.language);
  const t = translations[language];
  
  return { t, language };
};

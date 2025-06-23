// src/stores/languageStore.ts
import br from '@/shared/utils/texts/br';
import en from '@/shared/utils/texts/en';
import es from '@/shared/utils/texts/es';
import { create } from 'zustand';
interface LanguageStore {
  language: Language;
  nextLanguage: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  getNextLanguage: (currentLang: Language) => Language;
}
export const translations = { es, en, br };
export type Language = keyof typeof translations;
export const availableLanguages = Object.keys(translations) as Language[];


export const useLanguageStore = create<LanguageStore>((set, get) => {
  const getNextLanguage = (currentLang: Language): Language => {
    const currentIndex = availableLanguages.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    return availableLanguages[nextIndex];
  };

  const initialLanguage = (localStorage.getItem('lang') as Language) || availableLanguages[0];

  return {
    language: initialLanguage,
    nextLanguage: getNextLanguage(initialLanguage),
    
    getNextLanguage,
    
    setLanguage: (lang: Language) => {
      localStorage.setItem('lang', lang);
      set({ 
        language: lang,
        nextLanguage: getNextLanguage(lang)
      });
    },

    toggleLanguage: () => {
      // const current = get().language;
      const next = get().nextLanguage;
      
      localStorage.setItem('lang', next);
      set({ 
        language: next,
        nextLanguage: getNextLanguage(next)
      });
    },
  };
});


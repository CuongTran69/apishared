'use client';

import { useState, useEffect } from 'react';
import translations, { Language } from '@/app/data/translations';

export function useTranslation() {
  // Use a two-step state approach to avoid hydration issues
  const [language, setLanguage] = useState<Language>('en');

  // Effect to handle language from localStorage only on client-side
  useEffect(() => {
    // Retrieve language from localStorage
    const savedLanguage = localStorage.getItem('appLanguage') as Language;
    if (savedLanguage && ['en', 'vi'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Language toggle function with localStorage support
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'vi' : 'en';
    setLanguage(newLanguage);

    // Save to localStorage
    localStorage.setItem('appLanguage', newLanguage);
  };

  return {
    language,
    t,
    toggleLanguage
  };
}

export default useTranslation; 
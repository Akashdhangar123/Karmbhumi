import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../../src/translations";

export type Language = "hi" | "en";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  setLanguage: (lang: Language) => void;
  t: typeof translations.hi;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("site_lang");
    return saved === "en" || saved === "hi" ? saved : "hi";
  });

  useEffect(() => {
    localStorage.setItem("site_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === "hi" ? "en" : "hi"));
  };

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
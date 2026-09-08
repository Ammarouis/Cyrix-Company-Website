import { useEffect, useState, useCallback, type ReactNode } from "react";
import { translations, type Language, isRTLLanguage } from "@/i18n/translations";
import { LanguageContext } from "./languageContext";

type NestedValue = string | { [key: string]: NestedValue };

function getNestedValue(obj: NestedValue, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}

const STORAGE_KEY = "cyrix-language";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored && translations[stored]) {
        return stored;
      }
    }
    return "en";
  });

  const isRTL = isRTLLanguage(language);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = language;
    }
  }, [language, isRTL]);

  const t = useCallback(
    (key: string, replacements?: Record<string, string>) => {
      const value = getNestedValue(translations[language], key);
      let result = value ?? key;
      if (replacements) {
        Object.entries(replacements).forEach(([replaceKey, replaceValue]) => {
          result = result.replace(new RegExp(`\\{${replaceKey}\\}`, "g"), replaceValue);
        });
      }
      return result;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

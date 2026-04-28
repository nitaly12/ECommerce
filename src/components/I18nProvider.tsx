"use client";

import "@/lib/i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type I18nProviderProps = {
  children: React.ReactNode;
};

export default function I18nProvider({ children }: I18nProviderProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const applyLocaleAttributes = (locale: string) => {
      document.documentElement.lang = locale;
      document.documentElement.setAttribute("data-locale", locale);
    };

    applyLocaleAttributes(i18n.language || "en");
  }, [i18n.language]);

  return <>{children}</>;
}

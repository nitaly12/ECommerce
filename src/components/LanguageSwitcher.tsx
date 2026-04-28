"use client";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const SUPPORTED_LANGUAGES = ["en", "km"] as const;

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (locale: string) => {
    i18n.changeLanguage(locale);
    localStorage.setItem("locale", locale);
  };

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale && SUPPORTED_LANGUAGES.includes(savedLocale as "en" | "km")) {
      i18n.changeLanguage(savedLocale);
    }
  }, [i18n]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">{t("language.label")}:</span>
      {SUPPORTED_LANGUAGES.map((locale) => {
        const isActive = i18n.language === locale;

        return (
          <button
            key={locale}
            type="button"
            onClick={() => handleLanguageChange(locale)}
            className={`rounded-md px-2 py-1 text-xs font-medium border transition-colors ${
              isActive
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {t(`language.options.${locale}`)}
          </button>
        );
      })}
    </div>
  );
}

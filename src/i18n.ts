import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import ko from "./locales/ko.json";
import uz from "./locales/uz.json";

export const languages = [
  { code: "en", label: "English", short: "EN" },
  { code: "ru", label: "Русский", short: "RU" },
  { code: "ko", label: "한국어", short: "KO" },
  { code: "uz", label: "Oʻzbek", short: "UZ" },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      ko: { translation: ko },
      uz: { translation: uz },
    },
    fallbackLng: "en",
    supportedLngs: languages.map((item) => item.code),
    detection: {
      order: ["localStorage"],
      lookupLocalStorage: "pf-lang",
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;

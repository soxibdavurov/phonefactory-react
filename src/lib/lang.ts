import { useTranslation } from "react-i18next";

export function useContentLang() {
  const { i18n } = useTranslation();
  return (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
}

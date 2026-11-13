import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../../../i18n";
import "./language-menu.css";

export default function LanguageMenu() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = languages.find((item) => item.code === (i18n.resolvedLanguage || "en").split("-")[0]) || languages[0];

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div className={`pf-lang${open ? " is-open" : ""}`} ref={root}>
      <button
        type="button"
        className="pf-lang-button"
        aria-label={String(t("language"))}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <i className="fa fa-globe" />
        <span>{current.short}</span>
        <i className="fa fa-angle-down" />
      </button>
      {open ? (
        <ul className="pf-lang-menu">
          {languages.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                className={item.code === current.code ? "is-current" : ""}
                onClick={() => {
                  i18n.changeLanguage(item.code);
                  setOpen(false);
                }}
              >
                <span>{item.short}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

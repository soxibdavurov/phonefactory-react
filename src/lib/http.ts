import axios from "axios";

axios.interceptors.request.use((config) => {
  const lang = localStorage.getItem("pf-lang") || "en";
  if (lang && lang !== "en") {
    config.params = { ...(config.params || {}), lang };
  }
  return config;
});

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "REACT_APP_");
  return {
    plugins: [react()],
    envPrefix: "REACT_APP_",
    server: {
      port: 3006,
      strictPort: true,
    },
    preview: {
      port: 3006,
      strictPort: true,
    },
    build: {
      outDir: "build",
    },
    define: {
      "process.env.PUBLIC_URL": JSON.stringify(""),
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env.REACT_APP_API_URL": JSON.stringify(env.REACT_APP_API_URL || ""),
    },
  };
});

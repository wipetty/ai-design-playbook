import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig(({ command, isPreview }) => {
  return {
    server: { https: {} },
    plugins: [
      react(),
      mkcert(),
      command === "serve" && !isPreview && checker({ typescript: true, enableBuild: false })
    ],
    build: {
      sourcemap: true,
      outDir: "./dist",
    },
  };
});

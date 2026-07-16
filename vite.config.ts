import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import { consoleForwardPlugin } from "vite-console-forward-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ command, isPreview }) => {
  return {
    plugins: [
      react(),
      ...(command === "serve" && !isPreview ? [checker({ typescript: true, enableBuild: false }), consoleForwardPlugin()] : []),
    ],
    build: {
      target: ["es2022"],
      sourcemap: true,
      outDir: "./dist",
      // Lightning CSS produces a much smaller CSS bundle than the default minifier.
      cssMinify: "lightningcss",
    },
  };
});

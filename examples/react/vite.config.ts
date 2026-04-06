import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import macros from "unplugin-parcel-macros";
import mkcert from "vite-plugin-mkcert";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig(({ command, isPreview }) => {
  return {
    server: { https: {} },
    plugins: [
      macros.vite(), // Must be first for S2 style macros
      react(),
      mkcert(),
      command === "serve" && !isPreview && checker({ typescript: true, enableBuild: false }),
    ],
    build: {
      target: ["es2022"],
      sourcemap: true,
      outDir: "./dist",
      // Lightning CSS produces a much smaller CSS bundle than the default minifier.
      cssMinify: "lightningcss",
      rollupOptions: {
        output: {
          // Bundle all S2 and style-macro generated CSS into a single bundle instead of code splitting.
          // Because atomic CSS has so much overlap between components, loading all CSS up front results in
          // smaller bundles instead of producing duplication between pages.
          manualChunks(id) {
            if (/macro-(.*)\.css$/.test(id) || /@react-spectrum\/s2\/.*\.css$/.test(id)) {
              return "s2-styles";
            }
          },
        },
      },
    },
  };
});

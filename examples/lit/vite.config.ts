// Example: Vite config for Lit (no React plugin, no macros)
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import checker from 'vite-plugin-checker';

export default defineConfig({
  server: {
    https: {}, // Required for Adobe IMS
  },
  plugins: [
    mkcert(), // Auto-generate local SSL certificates
    checker({
      typescript: true, // Enable TypeScript checking in dev mode
    }),
  ],
  build: {
    cssMinify: 'lightningcss',
  },
});

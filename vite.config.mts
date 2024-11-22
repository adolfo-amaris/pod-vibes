import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Define el alias para que "@/" apunte a la carpeta src
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "./src/styles/_vars" as vars;
        `,
      },
    },
  },
});

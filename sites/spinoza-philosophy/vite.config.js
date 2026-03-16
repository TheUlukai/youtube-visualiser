import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/youtube-visualiser/spinoza-philosophy/',
  build: {
    outDir: '../../docs/spinoza-philosophy',
    emptyOutDir: true,
  },
});

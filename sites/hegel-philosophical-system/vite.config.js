import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/youtube-visualiser/hegel-philosophical-system/',
  build: {
    outDir: '../../docs/hegel-philosophical-system',
    emptyOutDir: true,
  },
});

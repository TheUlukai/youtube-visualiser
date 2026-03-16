import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/youtube-visualiser/kant-copernican-revolution/',
  build: {
    outDir: '../../docs/kant-copernican-revolution',
    emptyOutDir: true,
  },
});

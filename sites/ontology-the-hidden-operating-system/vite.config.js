import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/youtube-visualiser/ontology-the-hidden-operating-system/',
  build: {
    outDir: '../../docs/ontology-the-hidden-operating-system',
    emptyOutDir: true,
  },
})

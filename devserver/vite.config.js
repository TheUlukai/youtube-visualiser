import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const nodeModules = path.resolve(__dirname, 'node_modules')

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', 'recharts', 'lucide-react'],
    alias: {
      // Force all imports to resolve from devserver/node_modules
      'react': path.join(nodeModules, 'react'),
      'react-dom': path.join(nodeModules, 'react-dom'),
      'react/jsx-runtime': path.join(nodeModules, 'react/jsx-runtime'),
      'recharts': path.join(nodeModules, 'recharts'),
      'lucide-react': path.join(nodeModules, 'lucide-react'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7067',  // Update to correct HTTPS backend port
        changeOrigin: true,
        secure: false,  // If using a self-signed cert, set this to false
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
plugins: [react()],
});

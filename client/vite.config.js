// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], 
  server: {
    // This block ensures the client redirects API calls to the backend
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, // Crucial for correct host header
        secure: false, 
      },
    },
  },
});
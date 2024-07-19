import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/posts': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/comments': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/likes': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

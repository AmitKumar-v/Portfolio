import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // While developing, requests to /api are forwarded to the Express server
    proxy: { '/api': 'http://localhost:5000' },
  },
});

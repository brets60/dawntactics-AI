import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ mode }) => {
  const isHttps = process.env.HTTPS === 'true' || mode === 'https' || process.argv.includes('--https');

  return {
    base: './',
    plugins: [
      react(),
      ...(isHttps ? [basicSsl()] : []),
    ],
    server: {
      port: 5173,
      https: isHttps ? {} : false,
      watch: {
        ignored: ['**/scripts/**', '**/dist/**'],
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3005',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});


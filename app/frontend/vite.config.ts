import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    build: {
      outDir: '../../dist',
      emptyOutDir: true,
      sourcemap: true,
    },
    server: {
      proxy: {
        '/ask': 'http://localhost:5000',
        '/chat': 'http://localhost:5000',
      },
    },
    define: {
      'process.env.REACT_APP_BACKEND_URL': JSON.stringify(
        env.REACT_APP_BACKEND_URL
      )
    },
  };
});

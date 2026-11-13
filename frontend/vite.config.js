import { defineConfig } from 'vite';
export default defineConfig({
  server: {
    watch: { usePolling: true, interval: 400 },
    host: '127.0.0.1', port: 5173, strictPort: true,
    proxy: { '/api': 'http://127.0.0.1:5050', '/uploads': 'http://127.0.0.1:5050' },
  },
});

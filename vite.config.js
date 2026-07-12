import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: { host: '0.0.0.0', port: 3000, allowedHosts: 'all' },
  base: '/', // Vercel serves from root
  build: {
    rollupOptions: {
      input: {
        main:      resolve(__dirname, 'index.html'),
        admin:     resolve(__dirname, 'admin.html'),
        calibrate: resolve(__dirname, 'calibrate.html'),
      }
    }
  }
});

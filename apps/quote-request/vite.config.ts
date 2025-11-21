import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@moving-company/forms': path.resolve(__dirname, '../../packages/forms/src'),
      '@moving-company/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@moving-company/types': path.resolve(__dirname, '../../packages/types/src'),
      '@moving-company/utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@moving-company/hooks': path.resolve(__dirname, '../../packages/hooks/src'),
      '@moving-company/constants': path.resolve(__dirname, '../../packages/constants/src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

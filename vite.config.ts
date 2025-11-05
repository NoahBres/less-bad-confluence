import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-oxc';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
      routeFileIgnorePrefix: '-',
      quoteStyle: 'single',
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // TODO: REPLACE '/repo-name/' WITH YOUR ACTUAL GITHUB REPOSITORY NAME SLASHES INCLUDED
  // Example: If your repo url is https://github.com/username/my-expense-tracker
  // Then change this to: base: '/my-expense-tracker/'
  base: '/NgweMatSu/', 
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
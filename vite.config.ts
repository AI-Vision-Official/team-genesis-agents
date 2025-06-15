
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./", // This ensures relative paths in the built files
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure assets are in the right place for Electron
    assetsDir: "assets",
    outDir: "dist",
    // Force relative paths for all assets
    rollupOptions: {
      output: {
        // Ensure all asset references are relative
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        format: 'es'
      }
    },
    // Disable sourcemap for production build
    sourcemap: false,
    minify: 'terser',
    // Ensure relative paths
    cssCodeSplit: false
  }
}));

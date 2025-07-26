import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Temporarily remove security headers that might block Lovable
const securityHeaders = {
  // Remove all headers temporarily to fix connection issue
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Apply security headers in development
    headers: mode === 'development' ? securityHeaders : {}
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
    // Security optimizations for production
    sourcemap: mode === 'development',
    // Only use terser in production mode to avoid development build issues
    minify: mode === 'production' ? 'terser' : false,
    ...(mode === 'production' && {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug']
        }
      }
    })
  }
}));

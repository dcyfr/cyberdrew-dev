import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from 'rollup-plugin-visualizer';

// Production optimization configuration
export default defineConfig(({ mode }) => ({
  base: '/', // Explicitly set base path for production deployment
  server: {
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize for production
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    cssMinify: true,
    // Removed custom manualChunks to avoid chunk initialization errors
    // Terser options for maximum compression
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
        passes: 1 // Reduced passes for debugging
      },
      mangle: {
        // Removed safari10 for debugging
      },
      format: {
        comments: false,
      }
    },
    // Asset optimization
    assetsInlineLimit: 4096, // 4KB
  chunkSizeWarningLimit: 450, // match CI vendor budget to avoid noisy warnings
    rollupOptions: {
      output: {
    manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@radix-ui')) return 'radix';
            if (id.includes('react-router')) return 'router';
            if (id.includes('framer-motion')) return 'motion';
      if (id.includes('markdown-it')) return 'markdown';
      if (id.includes('highlight.js')) return 'highlight';
      if (id.includes('@tanstack/react-query')) return 'query';
      if (id.includes('lucide-react')) return 'icons';
            return 'vendor';
          }
        },
      },
      plugins: [
        process.env.ANALYZE ? visualizer({ filename: 'dist/stats.html', open: false, gzipSize: true, brotliSize: true }) : undefined,
      ].filter(Boolean)
    },
  },
  
  // Optimize dependencies - exclude large libraries from pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  },
  
  // CSS optimization
  css: {
    devSourcemap: mode === 'development'
  },
  
  // Environment variables
  define: {
    __DEV__: mode === 'development',
    'process.env.NODE_ENV': JSON.stringify(mode)
  },
  
  // Preview server configuration for Vercel
  preview: {
    port: 3000,
    host: true
  }
}));

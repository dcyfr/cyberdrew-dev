import { defineConfig } from 'vite';
import { SECURITY_HEADERS } from './src/lib/security-headers';

/**
 * Security configuration for Vite development server
 */
export const securityConfig = defineConfig({
  server: {
    // Enable HTTPS in development
    https: process.env.NODE_ENV === 'development' ? false : true,
    
    // Security headers for development server
    headers: SECURITY_HEADERS,
    
    // Configure CORS
    cors: {
      origin: process.env.NODE_ENV === 'development' ? true : ['https://cyberdrew-dev.com'],
      credentials: true
    }
  },
  
  // Build optimizations for security
  build: {
    // Enable source maps only in development
    sourcemap: process.env.NODE_ENV === 'development',
    
    // Minify for production
    minify: 'terser',
    
    // Security-focused terser options
    terserOptions: {
      compress: {
        // Remove console logs in production
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        // Mangle function names for security
        keep_fnames: false,
        keep_classnames: false
      }
    }
  },
  
  // Define security-related environment variables
  define: {
    // Ensure NODE_ENV is properly set
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    
    // Remove development tools in production
    __DEV__: process.env.NODE_ENV === 'development'
  }
});
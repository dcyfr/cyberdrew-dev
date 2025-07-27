# Vercel Deployment Guide

This project is optimized for deployment on Vercel. Follow these steps for optimal performance.

## Prerequisites

- Node.js 18+ installed locally
- Vercel CLI (optional): `npm i -g vercel`
- Git repository connected to Vercel

## Quick Deploy

### Method 1: Import from Git (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Vercel will auto-detect Vite framework
4. Click "Deploy"

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Follow the prompts
```

## Production Optimizations Applied

### Build Optimizations
- **Code splitting**: Vendor, UI, utils, and icons chunks
- **Tree shaking**: Removes unused code
- **Minification**: Terser with maximum compression
- **Asset optimization**: Images and static files
- **Cache headers**: Long-term caching for static assets

### Performance Features
- **Lazy loading**: Route-based code splitting
- **Resource hints**: DNS prefetch and preconnect
- **Bundle analysis**: Optimized chunk sizes
- **CSS optimization**: PostCSS with autoprefixer

### Security Headers (via vercel.json)
- Content Security Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer Policy
- Permissions Policy

## Environment Variables

Create these in Vercel Dashboard → Project Settings → Environment Variables:

```bash
# Production
NODE_ENV=production

# Optional: Analytics
VITE_ANALYTICS_ID=your_analytics_id
```

## Custom Domain Setup

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown:
   ```
   Type: A
   Name: @
   Value: 76.76.19.61
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. SSL certificates are auto-generated

## Performance Monitoring

### Core Web Vitals
- **LCP**: < 2.5s (optimized with lazy loading)
- **FID**: < 100ms (React 18 concurrent features)
- **CLS**: < 0.1 (stable layouts)

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

## Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules dist .next
npm install
npm run build
```

### Deployment Issues
1. Check Vercel build logs
2. Verify `vercel.json` configuration
3. Ensure all dependencies are in `package.json`
4. Check Node.js version compatibility

### Performance Issues
1. Enable Vercel Analytics
2. Use Lighthouse for performance audits
3. Monitor Core Web Vitals
4. Check bundle size with analyzer

## Additional Optimizations

### Images
- Use WebP format when possible
- Implement lazy loading for images
- Use Vercel Image Optimization API

### Fonts
- Google Fonts are preconnected
- Consider using `font-display: swap`

### API Routes (if needed)
```javascript
// pages/api/example.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Vercel!' });
}
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vite.dev/guide)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Web Vitals](https://web.dev/vitals/)

## Support

For deployment issues:
1. Check Vercel Status Page
2. Review build logs in dashboard
3. Contact Vercel Support
4. Community Discord/GitHub
# 🚀 Deployment Guide

This guide covers multiple options for deploying your AI Interview Coach application.

## Build Status

✅ **Application is built and ready to deploy!**

The production files are in the `dist/` folder:
- Total size: ~204 KB
- Optimized and minified
- Ready for any static hosting service

## Quick Deploy Options

### 1. Vercel (Recommended - Easiest)

Vercel offers the simplest deployment with automatic HTTPS and global CDN.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Scope: Your account
# - Link to existing project? No
# - Project name: ai-interview-coach
# - Directory: ./ (current)
# - Override settings? No
```

**Or deploy via GitHub:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel auto-detects Vite and deploys!

### 2. Netlify

Netlify provides similar ease of use with drag-and-drop deployment.

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build (if not already built)
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

**Or drag-and-drop:**
1. Go to [netlify.com](https://netlify.com)
2. Drag the `dist` folder to the deployment area
3. Done!

### 3. GitHub Pages

Free hosting directly from your GitHub repository.

```bash
# Install gh-pages
npm install -g gh-pages

# Build
npm run build

# Deploy
npx gh-pages -d dist
```

**Configure GitHub Pages:**
1. Go to your repo settings
2. Navigate to Pages section
3. Set source to `gh-pages` branch
4. Your site will be live at `https://yourusername.github.io/interview-coach`

### 4. Firebase Hosting

Google's Firebase offers fast global CDN and easy deployment.

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Configure:
# - Public directory: dist
# - Single-page app: Yes
# - Automatic builds with GitHub: Optional

# Deploy
firebase deploy
```

### 5. AWS S3 + CloudFront

For AWS users, host on S3 with CloudFront CDN.

```bash
# Install AWS CLI
# Configure: aws configure

# Create S3 bucket
aws s3 mb s3://ai-interview-coach

# Enable static hosting
aws s3 website s3://ai-interview-coach --index-document index.html

# Upload build
aws s3 sync dist/ s3://ai-interview-coach --acl public-read

# Optional: Set up CloudFront for CDN
```

## Environment Variables

If you need environment variables in production:

### Vercel
```bash
vercel env add VITE_OPENAI_API_KEY
```

### Netlify
1. Go to Site settings > Build & deploy > Environment
2. Add variables:
   - Key: `VITE_OPENAI_API_KEY`
   - Value: Your API key

### GitHub Pages
- Add secrets to repository settings
- Create GitHub Action workflow to inject variables during build

## Custom Domain Setup

### Vercel
```bash
vercel domains add yourdomain.com
```

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Configure DNS records as shown

### GitHub Pages
1. Add CNAME file to `public/` folder with your domain
2. Configure DNS:
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

## Performance Optimization

The build is already optimized, but you can further improve:

### 1. Enable Compression
Most hosting providers enable gzip/brotli automatically. Verify with:
```bash
curl -H "Accept-Encoding: gzip" -I https://yourdomain.com
```

### 2. Cache Headers
Configure cache headers on your hosting:
- HTML files: `Cache-Control: no-cache`
- CSS/JS files: `Cache-Control: max-age=31536000`

### 3. CDN
All recommended providers include CDN by default:
- Vercel: Edge Network (global)
- Netlify: CDN (global)
- CloudFront: AWS global network

## Monitoring & Analytics

### Add Google Analytics
1. Create GA4 property
2. Add tracking code to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Error Tracking
Consider adding:
- [Sentry](https://sentry.io) for error tracking
- [LogRocket](https://logrocket.com) for session replay

## Continuous Deployment

### GitHub Actions (All Platforms)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## Security Checklist

Before deploying:
- [ ] Remove any sensitive data from code
- [ ] Use environment variables for API keys
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Configure CORS if needed
- [ ] Set up Content Security Policy headers
- [ ] Enable security headers (X-Frame-Options, etc.)

## Troubleshooting

### 404 on Page Refresh
Single-page apps need proper routing configuration:

**Vercel**: Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Netlify**: Create `_redirects` in `dist/`:
```
/*    /index.html   200
```

### Blank Page After Deploy
1. Check browser console for errors
2. Verify base URL in `vite.config.ts`
3. Ensure all assets are loading correctly

### Environment Variables Not Working
- Prefix all variables with `VITE_`
- Rebuild after changing env vars
- Variables are embedded at build time, not runtime

## Cost Estimates

All these options have generous free tiers:

| Provider | Free Tier | Bandwidth | Custom Domain |
|----------|-----------|-----------|---------------|
| Vercel | 100 GB/month | Unlimited builds | Yes |
| Netlify | 100 GB/month | 300 build mins | Yes |
| GitHub Pages | 100 GB/month | Unlimited | Yes |
| Firebase | 10 GB/month | 360 MB/day | Yes |

## Recommended Setup

For most users:
1. **Deploy to Vercel** (easiest, fastest)
2. **Connect GitHub** for automatic deployments
3. **Add custom domain** (optional)
4. **Enable analytics** (optional)

Total setup time: ~5 minutes!

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- GitHub Pages: https://docs.github.com/pages
- Firebase Hosting: https://firebase.google.com/docs/hosting

---

Your AI Interview Coach is ready to go live! 🚀

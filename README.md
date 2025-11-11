# Adil Ahmad - Senior Software Engineer Portfolio

> Production-ready React portfolio with 3D graphics, optimized performance, and enterprise security

A sophisticated, performance-optimized portfolio website showcasing full-stack development expertise, AI integration capabilities, and modern web technologies. Built with React, TypeScript, Three.js, and Vite.

## 🚀 Features

- **3D Graphics**: Interactive Earth model, animated technology balls, starfield background, and wave animations
- **Performance Optimized**: Sub-3-second load times with adaptive rendering based on device capabilities
- **Enterprise Security**: Comprehensive CSP, security headers, input validation, and XSS protection
- **Accessibility**: WCAG 2.1 AA compliant with ARIA attributes, keyboard navigation, and reduced motion support
- **SEO Optimized**: Complete meta tags, Open Graph, Twitter Cards, sitemap, and robots.txt
- **Progressive Web App**: Offline support, service worker caching, and installable
- **Responsive Design**: Optimized for mobile, tablet, and desktop with adaptive 3D rendering

## 🛠️ Tech Stack

- **Framework**: React 18.3+ with TypeScript
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Build Tool**: Vite 5.4+
- **Form Handling**: EmailJS (deferred loading)
- **PWA**: vite-plugin-pwa

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install
# or
pnpm install
# or
yarn install

# Copy environment variables template
cp .env.example .env

# Edit .env with your EmailJS credentials
# Get them from https://www.emailjs.com/
```

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Important Notes:**
- All variables must be prefixed with `VITE_` to be exposed to the client
- Never commit `.env` files with actual credentials
- See `.env.example` for the template

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Production
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
npm run typecheck    # TypeScript type checking
npm run format       # Format code with Prettier
npm run format:check # Check code formatting

# Analysis
npm run build:analyze # Build with bundle analysis (generates dist/stats.html)
```

## 🏗️ Project Structure

```
.
├── public/                 # Static assets
│   ├── earth/             # 3D Earth model files
│   ├── _headers           # Security headers (for Netlify/Cloudflare)
│   ├── robots.txt         # Search engine directives
│   └── sitemap.xml        # Site structure for SEO
├── src/
│   ├── assets/            # Images, icons, textures
│   ├── components/        # React components
│   │   ├── canvas/       # 3D canvas components (Earth, Ball, Stars, Wave)
│   │   └── ...          # Other UI components
│   ├── constants/        # Static data (nav links, services, tech, projects)
│   ├── hoc/              # Higher-Order Components
│   ├── utils/            # Utility functions
│   │   ├── logger.ts     # Centralized logging
│   │   ├── motion.ts     # Framer Motion variants
│   │   ├── performance.ts # Device/network detection
│   │   └── useInView.ts  # Intersection Observer hook
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Performance Optimizations

### Code Splitting
- All major components lazy-loaded with `React.lazy()`
- Vendor chunks split (react, three.js, framer-motion)
- Dynamic imports for EmailJS

### 3D Rendering
- Adaptive DPR based on device capabilities
- Conditional antialiasing (disabled on mobile/low-end)
- Reduced object counts on low-end devices
- Animation intensity scaling
- `frameloop="demand"` for on-demand rendering

### Asset Loading
- Asynchronous 3D model preloading (1s delay)
- Network-aware preloading (skips on slow connections)
- Lazy image loading with `loading="lazy"`
- Resource hints (preconnect, dns-prefetch, prefetch)

### Build Optimizations
- Brotli and Gzip compression
- Content-hashed assets for long-term caching
- Tree-shaking enabled
- Console/debugger removal in production
- Sourcemap disabled in production

## 🔒 Security Features

### Content Security Policy (CSP)
- Strict CSP in `public/_headers` and `index.html`
- `frame-ancestors 'none'` to prevent clickjacking
- `object-src 'none'` to prevent plugin injection
- `upgrade-insecure-requests` for HTTPS enforcement

### HTTP Security Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security` (HSTS)
- `Referrer-Policy: strict-origin-when-cross-origin`

### Input Validation
- Client-side form validation with length limits
- XSS prevention (script tag removal)
- Email format validation
- Required field validation

### Permissions Policy
- Restricts geolocation, camera, microphone, payment APIs
- Disables unnecessary browser features

## ♿ Accessibility

- **ARIA Attributes**: Comprehensive labels, roles, and states
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference
- **Semantic HTML**: Proper use of HTML5 semantic elements
- **Form Accessibility**: Labels, error messages, and validation feedback

## 📈 SEO

- Comprehensive meta tags (title, description, keywords, author)
- Open Graph tags for social media sharing
- Twitter Card tags
- Sitemap.xml for search engines
- Robots.txt configuration
- Semantic HTML structure

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized `dist/` folder with:
- Minified and compressed assets
- Content-hashed filenames for caching
- Brotli and Gzip compressed files
- Service worker for PWA functionality

### Deploy to Static Host

The site can be deployed to any static hosting provider:

**Netlify / Vercel / Cloudflare Pages:**
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in dashboard
5. Deploy!

**Manual Deployment:**
1. Run `npm run build`
2. Upload `dist/` folder contents to your hosting provider
3. Ensure `public/_headers` is configured (for Netlify/Cloudflare)
4. Configure environment variables

### Post-Deployment Checklist

- [ ] Verify HTTPS is enabled
- [ ] Test contact form functionality
- [ ] Verify security headers are active (use [SecurityHeaders.com](https://securityheaders.com))
- [ ] Test on mobile devices
- [ ] Verify 3D models load correctly
- [ ] Check Lighthouse scores (aim for 90+)
- [ ] Test with slow 3G throttling
- [ ] Verify sitemap.xml is accessible
- [ ] Test keyboard navigation
- [ ] Verify reduced motion works

## 📊 Performance Targets

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

## 🧪 Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Format checking
npm run format:check
```

## 📝 Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured for React, TypeScript, and Hooks
- **Prettier**: Consistent code formatting
- **JSDoc**: Comprehensive documentation for all public APIs
- **Error Boundaries**: Graceful error handling

## 🔧 Configuration

### Vite Configuration (`vite.config.js`)
- Code splitting with manual chunks
- Compression (Brotli + Gzip)
- PWA plugin configuration
- Bundle analyzer support

### Tailwind Configuration (`tailwind.config.cjs`)
- Custom color palette
- Extended theme configuration

## 📄 License

UNLICENSED - All rights reserved

## 👤 Author

**Adil Ahmad**
- Email: adil@quantonimus.com
- Portfolio: https://adil-ahmad.dev

## 🙏 Acknowledgments

- Three.js community for excellent 3D web graphics library
- React Three Fiber for React integration
- Drei for helpful Three.js helpers
- Vite team for blazing-fast build tooling

---

**Built with ❤️ using React, TypeScript, and Three.js**

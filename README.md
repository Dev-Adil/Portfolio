# 3D Portfolio (React + Vite + Three.js)

Production-optimized React portfolio with lazy three.js scenes and strong security defaults.

## Environment variables

Create `.env` (or `.env.local`) in project root:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Notes:
- Variables must be prefixed with `VITE_` to be exposed to the client.
- Do not commit `.env` files.

## Scripts

- `npm run dev` - start dev server
- `npm run build` - build for production
- `npm run preview` - preview production build locally

## Production build tips

- Content-hashed assets for long-term caching are emitted in `dist/`.
- Host with HTTP/2 or HTTP/3 and enable Brotli/Gzip. This project emits both.
- Serve `dist/` with far-future cache headers for hashed assets.
- Security headers (CSP, Permissions-Policy) are added as meta in `index.html`.
- Set `ANALYZE=1` before `npm run build` to generate `dist/stats.html`.

## Deploy

Any static host (Netlify, Vercel, Cloudflare Pages, S3+CloudFront, Azure Static Web Apps). Build and upload `dist/`:

```
npm ci
npm run build
npm run preview # optional local check
```

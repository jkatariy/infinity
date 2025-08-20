/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const withBundleAnalyzer = process.env.ANALYZE === 'true' 
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config;

const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'via.placeholder.com'], // Allow Cloudinary and placeholder images
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  generateEtags: false,
  // Optimize bundle size
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['@heroicons/react', 'framer-motion'],
    optimizeCss: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  transpilePackages: ['framer-motion'],
  // Optimize webpack configuration
  webpack: (config, { isServer, dev }) => {
    // Optimize for framer-motion
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': require.resolve('framer-motion'),
    };

    // Tree shaking optimization
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };
    }

    // Optimize bundle splitting
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    };

    return config;
  },
  headers: async () => {
    // Apply strict security headers only in production.
    // In development, relax CSP to avoid blocking Next.js HMR (WebSocket) and tooling.
    if (!isProd) {
      return [];
    }

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; " +
              // images and media
              "img-src 'self' data: https: https://res.cloudinary.com; " +
              "media-src 'self' https:; " +
              // scripts and styles
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com https://www.gstatic.com/recaptcha/ https://www.gstatic.com/recaptcha/releases/ https://www.gstatic.com/recaptcha/releases/*; " +
              "style-src 'self' 'unsafe-inline'; " +
              // frames and embeds
              "frame-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com https://www.gstatic.com https://www.google.com/recaptcha/; " +
              // connections (include GA, Supabase, Zoho, and allow wss for any future needs)
              "connect-src 'self' https://api.perplexity.ai https://accounts.zoho.com https://www.zohoapis.com https://zxvhgpejwgrlxksnqtxk.supabase.co https://www.google-analytics.com https://analytics.google.com wss:; " +
              // fonts and misc
              "font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;",
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif|mp4|webm|mov)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:all*(css|js|woff2|woff|ttf)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      // Conveying subpages consolidated to a single page
      { source: '/products/conveying/flat-belt', destination: '/products/conveying', permanent: true },
      { source: '/products/conveying/modular-conveyor', destination: '/products/conveying', permanent: true },
      { source: '/products/conveying/roller-conveyor', destination: '/products/conveying', permanent: true },
      { source: '/products/conveying/compression-conveyor', destination: '/products/conveying', permanent: true },
      { source: '/products/conveying/spiral-conveyor', destination: '/products/conveying', permanent: true },
      { source: '/products/conveying/z-bucket-elevator', destination: '/products/conveying', permanent: true },
      { source: '/products/conveying/crate-lifter', destination: '/products/conveying', permanent: true },
      { source: '/products/conveying/box-lifter', destination: '/products/conveying', permanent: true },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig); 
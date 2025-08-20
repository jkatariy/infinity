import { NextResponse } from 'next/server';

const baseUrl = 'https://infinitysols.com'; // Update with your actual domain

// Static pages
const staticPages = [
  '',
  '/about',
  '/about/profile',
  '/about/awards',

  '/about/infrastructure',
  '/products',
  '/products/bundling-wrapping',
  '/products/bundling-wrapping/ibp-120',
  '/products/bundling-wrapping/ibs-200',
  '/products/bundling-wrapping/ims-800',
  '/products/bundling-wrapping/isb-120',
  '/products/bundling-wrapping/isp-120',
  '/products/bundling-wrapping/iwb-200',
  '/products/cartoning',
  '/products/cartoning/acm-100',
  '/products/cartoning/acm-40',
  '/products/case-packers',
  '/products/case-packers/case-erector',
  '/products/case-packers/case-sealer',
  '/products/case-packers/icb-120',
  '/products/case-packers/icp-120',
  '/products/case-packers/ics-200',
  '/products/checkweighers-inspection',
  '/products/conveying',
  '/products/pouch-baler',
  '/products/pouch-baler/ibg-8',
  '/products/pouch-baler/ibg-h8-v8',
  '/products/pouch-baler/ibl-500',
  '/solutions/bundling-wrapping',
  '/solutions/bundling-wrapping/ibp-120',
  '/solutions/cartoning',
  '/solutions/cartoning/acm-40',
  '/solutions/pouch-baler',
  '/solutions/pouch-baler/ibg-h8-v8',

  '/clientele',
  '/contact',
  '/events',
  '/news',
  '/blog',
  '/product-selector',
  '/search',
  '/service-request',
];

export async function GET() {
  try {
    const currentDate = new Date().toISOString();
    
    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${getChangeFreq(page)}</changefreq>
    <priority>${getPriority(page)}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

function getChangeFreq(page: string): string {
  if (page === '' || page === '/') return 'weekly';
  if (page.includes('/blog')) return 'weekly';
  if (page.includes('/news') || page.includes('/events')) return 'weekly';
  if (page.includes('/products') || page.includes('/solutions')) return 'monthly';
  return 'monthly';
}

function getPriority(page: string): string {
  if (page === '' || page === '/') return '1.0';
  if (page === '/products' || page === '/solutions') return '0.9';
  if (page === '/about' || page === '/contact') return '0.8';
  if (page.includes('/products/') || page.includes('/solutions/')) return '0.7';
  if (page === '/blog' || page === '/news') return '0.6';
  return '0.5';
} 
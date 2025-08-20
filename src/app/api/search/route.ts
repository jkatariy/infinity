import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { promises as fs } from 'fs';
import path from 'path';

// Cache search results for 1 hour
export const revalidate = 3600;

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'product' | 'blog' | 'event' | 'page';
  category?: string;
  image?: string;
  relevance: number;
}

interface SearchMeta {
  total: number;
  query: string;
  type: string;
}

// Static product data based on actual file structure
const productData = [
  // Bundling & Wrapping
  {
    id: 'ibp-120',
    title: 'Secondary Packaging for Pouches (IBP-120)',
    description: 'Advanced secondary packaging machine for pouches with high-speed automation and precise handling capabilities.',
    category: 'bundling-wrapping',
    type: 'product',
    keywords: ['pouch', 'packaging', 'secondary', 'bundling', 'wrapping', 'automation']
  },
  {
    id: 'ibs-200',
    title: 'Secondary Packaging for Strip of Pouches (IBS-200)',
    description: 'Specialized machine for handling strip of pouches with automated bundling and wrapping functionality.',
    category: 'bundling-wrapping',
    type: 'product',
    keywords: ['strip', 'pouch', 'packaging', 'bundling', 'automation']
  },
  {
    id: 'ims-800',
    title: 'Secondary Packaging for Multitrack VFFS (IMS-800)',
    description: 'High-capacity multitrack VFFS packaging solution for large-scale production environments.',
    category: 'bundling-wrapping',
    type: 'product',
    keywords: ['multitrack', 'vffs', 'packaging', 'large scale', 'production']
  },
  {
    id: 'isb-120',
    title: 'Automatic Shrink Bundling Machine (ISB-120)',
    description: 'Efficient shrink bundling solution for various product types with automated wrapping.',
    category: 'bundling-wrapping',
    type: 'product',
    keywords: ['shrink', 'bundling', 'automatic', 'wrapping']
  },
  {
    id: 'isp-120',
    title: 'Automatic Shrink Wrapping Machine for Pouches (ISP-120)',
    description: 'Precision shrink wrapping machine designed specifically for pouch packaging applications.',
    category: 'bundling-wrapping',
    type: 'product',
    keywords: ['shrink', 'wrapping', 'pouches', 'automatic', 'precision']
  },
  {
    id: 'iwb-200',
    title: 'Automatic Shrink Wrapping Machine for Bottles (IWB-200)',
    description: 'Specialized shrink wrapping solution for bottles with high-speed processing capabilities.',
    category: 'bundling-wrapping',
    type: 'product',
    keywords: ['shrink', 'wrapping', 'bottles', 'high speed', 'automatic']
  },

  // Cartoning
  {
    id: 'acm-100',
    title: 'Automatic Cartoning Machine (ACM-100)',
    description: 'High-speed automatic cartoning machine for efficient packaging operations.',
    category: 'cartoning',
    type: 'product',
    keywords: ['cartoning', 'automatic', 'high speed', 'packaging', 'efficiency']
  },
  {
    id: 'acm-40',
    title: 'Semi Automatic Cartoning Machine (ACM-40)',
    description: 'Versatile semi-automatic cartoning solution for medium-scale production.',
    category: 'cartoning',
    type: 'product',
    keywords: ['cartoning', 'semi automatic', 'versatile', 'medium scale']
  },

  // Case Packers
  {
    id: 'case-erector',
    title: 'Case Erector',
    description: 'Automated case erection system for efficient packaging line setup.',
    category: 'case-packers',
    type: 'product',
    keywords: ['case', 'erector', 'automated', 'packaging', 'setup']
  },
  {
    id: 'case-sealer',
    title: 'Case Sealer',
    description: 'Reliable case sealing solution for secure packaging closure.',
    category: 'case-packers',
    type: 'product',
    keywords: ['case', 'sealer', 'reliable', 'secure', 'closure']
  },
  {
    id: 'icb-120',
    title: 'ICB-120 Case Packer',
    description: 'Efficient case packing machine for automated product loading.',
    category: 'case-packers',
    type: 'product',
    keywords: ['case', 'packer', 'efficient', 'automated', 'loading']
  },
  {
    id: 'icp-120',
    title: 'ICP-120 Case Packer',
    description: 'Advanced case packing solution with precise handling capabilities.',
    category: 'case-packers',
    type: 'product',
    keywords: ['case', 'packer', 'advanced', 'precise', 'handling']
  },
  {
    id: 'ics-200',
    title: 'ICS-200 Case Packer',
    description: 'High-capacity case packing system for large-scale operations.',
    category: 'case-packers',
    type: 'product',
    keywords: ['case', 'packer', 'high capacity', 'large scale', 'operations']
  },

  // Checkweighers
  {
    id: 'icw-1200',
    title: 'ICW-1200 Checkweigher',
    description: 'Precision checkweigher for accurate weight verification and quality control.',
    category: 'checkweighers',
    type: 'product',
    keywords: ['checkweigher', 'precision', 'weight', 'verification', 'quality control']
  },
  {
    id: 'icw-25k',
    title: 'ICW-25K Checkweigher',
    description: 'Heavy-duty checkweigher for large package weight verification.',
    category: 'checkweighers',
    type: 'product',
    keywords: ['checkweigher', 'heavy duty', 'large package', 'weight verification']
  },
  {
    id: 'icw-50k',
    title: 'ICW-50K Checkweigher',
    description: 'Industrial checkweigher for maximum capacity weight checking.',
    category: 'checkweighers',
    type: 'product',
    keywords: ['checkweigher', 'industrial', 'maximum capacity', 'weight checking']
  },
  {
    id: 'icw-600',
    title: 'ICW-600 Checkweigher',
    description: 'Compact checkweigher solution for medium-capacity operations.',
    category: 'checkweighers',
    type: 'product',
    keywords: ['checkweigher', 'compact', 'medium capacity', 'operations']
  },
  {
    id: 'icw-6000',
    title: 'ICW-6000 Checkweigher',
    description: 'High-performance checkweigher for demanding industrial applications.',
    category: 'checkweighers',
    type: 'product',
    keywords: ['checkweigher', 'high performance', 'demanding', 'industrial']
  },
  {
    id: 'icw-series',
    title: 'ICW Series Checkweighers',
    description: 'Complete range of checkweighers for various industrial requirements.',
    category: 'checkweighers',
    type: 'product',
    keywords: ['checkweigher', 'series', 'complete range', 'industrial requirements']
  },

  // Conveying
  {
    id: 'box-lifter',
    title: 'Box Lifter',
    description: 'Automated box lifting system for efficient material handling.',
    category: 'conveying',
    type: 'product',
    keywords: ['box', 'lifter', 'automated', 'material handling', 'efficient']
  },
  {
    id: 'compression-conveyor',
    title: 'Compression Conveyor',
    description: 'Specialized conveyor system for compression and transport applications.',
    category: 'conveying',
    type: 'product',
    keywords: ['compression', 'conveyor', 'specialized', 'transport']
  },
  {
    id: 'crate-lifter',
    title: 'Crate Lifter',
    description: 'Heavy-duty crate lifting solution for warehouse operations.',
    category: 'conveying',
    type: 'product',
    keywords: ['crate', 'lifter', 'heavy duty', 'warehouse', 'operations']
  },
  {
    id: 'flat-belt',
    title: 'Flat Belt Conveyor',
    description: 'Versatile flat belt conveyor system for general material transport.',
    category: 'conveying',
    type: 'product',
    keywords: ['flat belt', 'conveyor', 'versatile', 'material transport']
  },
  {
    id: 'modular-conveyor',
    title: 'Modular Conveyor',
    description: 'Flexible modular conveyor system for customized layouts.',
    category: 'conveying',
    type: 'product',
    keywords: ['modular', 'conveyor', 'flexible', 'customized', 'layouts']
  },
  {
    id: 'roller-conveyor',
    title: 'Roller Conveyor',
    description: 'Efficient roller conveyor system for smooth product movement.',
    category: 'conveying',
    type: 'product',
    keywords: ['roller', 'conveyor', 'efficient', 'smooth', 'movement']
  },
  {
    id: 'spiral-conveyor',
    title: 'Spiral Conveyor',
    description: 'Space-saving spiral conveyor for vertical product transport.',
    category: 'conveying',
    type: 'product',
    keywords: ['spiral', 'conveyor', 'space saving', 'vertical', 'transport']
  },
  {
    id: 'z-bucket-elevator',
    title: 'Z-Bucket Elevator',
    description: 'Z-type bucket elevator for efficient vertical material handling.',
    category: 'conveying',
    type: 'product',
    keywords: ['z bucket', 'elevator', 'vertical', 'material handling', 'efficient']
  },

  // Inspection
  {
    id: 'vision-systems',
    title: 'Vision Inspection Systems',
    description: 'Advanced vision systems for automated quality inspection and control.',
    category: 'inspection',
    type: 'product',
    keywords: ['vision', 'inspection', 'quality', 'automated', 'control']
  },

  // Pouch Baler
  {
    id: 'ibg-8',
    title: 'IBG-8 Bagging Machine',
    description: 'Efficient bagging machine for pouch and small product packaging.',
    category: 'pouch-baler',
    type: 'product',
    keywords: ['bagging', 'machine', 'pouch', 'small product', 'packaging']
  },
  {
    id: 'ibg-h8-v8',
    title: 'IBG-H8 & IBG-V8 Bagging Machine',
    description: 'Horizontal and vertical bagging machines for diverse packaging needs.',
    category: 'pouch-baler',
    type: 'product',
    keywords: ['horizontal', 'vertical', 'bagging', 'diverse', 'packaging']
  },
  {
    id: 'ibl-500',
    title: 'IBL-500 Baler Machine',
    description: 'Automatic baler machine for efficient waste and material compression.',
    category: 'pouch-baler',
    type: 'product',
    keywords: ['baler', 'automatic', 'waste', 'material', 'compression']
  }
];

// Static page data
const pageData = [
  {
    id: 'about-profile',
    title: 'About Us - Company Profile',
    description: 'Learn about Infinity Automated Solutions and our commitment to packaging automation excellence.',
    type: 'page',
    url: '/about/profile',
    keywords: ['about', 'company', 'profile', 'history', 'mission']
  },

  {
    id: 'about-infrastructure',
    title: 'Our Infrastructure',
    description: 'Explore our state-of-the-art manufacturing facilities and capabilities.',
    type: 'page',
    url: '/about/infrastructure',
    keywords: ['infrastructure', 'facilities', 'manufacturing', 'capabilities']
  },
  {
    id: 'about-awards',
    title: 'Awards and Certifications',
    description: 'View our awards, certifications, and industry recognition.',
    type: 'page',
    url: '/about/awards',
    keywords: ['awards', 'certifications', 'recognition', 'achievements']
  },
  {
    id: 'contact',
    title: 'Contact Us',
    description: 'Get in touch with our team for inquiries, support, and business partnerships.',
    type: 'page',
    url: '/contact',
    keywords: ['contact', 'support', 'inquiry', 'partnership', 'location']
  },
  {
    id: 'clientele',
    title: 'Our Clientele',
    description: 'Meet our valued clients and success stories across various industries.',
    type: 'page',
    url: '/clientele',
    keywords: ['clients', 'customers', 'success stories', 'testimonials']
  }
];

// Helper function to sanitize search query
function sanitizeSearchQuery(query: string): string {
  return query.replace(/[^\w\s]/gi, '').trim();
}

// Helper function to calculate relevance score
function calculateRelevance(item: any, searchTerms: string[]): number {
  let score = 0;
  const title = item.title.toLowerCase();
  const description = item.description.toLowerCase();
  const keywords = item.keywords ? item.keywords.join(' ').toLowerCase() : '';
  const category = item.category ? item.category.toLowerCase() : '';
  
  for (const term of searchTerms) {
    const termLower = term.toLowerCase();
    
    // Exact title match (highest score)
    if (title.includes(termLower)) {
      score += title === termLower ? 10 : 5;
    }
    
    // Keywords match (high score)
    if (keywords.includes(termLower)) {
      score += 4;
    }
    
    // Category match
    if (category.includes(termLower)) {
      score += 3;
    }
    
    // Description match
    if (description.includes(termLower)) {
      score += 2;
    }
    
    // Partial matches
    if (title.includes(termLower.substring(0, Math.max(3, Math.ceil(termLower.length * 0.7))))) {
      score += 1;
    }
  }
  
  return score;
}

export async function GET(request: NextRequest) {
  try {
    // Parse the URL to get search parameters
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const type = url.searchParams.get('type');
  
    if (!query) {
      return NextResponse.json({ results: [], meta: { total: 0, query: '', type: 'all' } });
    }

    const sanitizedQuery = sanitizeSearchQuery(query);
    const searchTerms = sanitizedQuery.toLowerCase().split(/\s+/).filter(term => term.length > 1);
    
    if (searchTerms.length === 0) {
      return NextResponse.json({ results: [], meta: { total: 0, query: sanitizedQuery, type: 'all' } });
    }

    // Combine all searchable content
    const allContent = [
      ...productData.map(product => ({
        ...product,
        url: `/products/${product.category}/${product.id}`,
        image: `/images/products/${product.id}.jpg` // Assuming product images follow this pattern
      })),
      ...pageData
    ];

    // Calculate relevance and filter results
    let results: SearchResult[] = allContent
      .map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
        url: item.url,
        type: item.type as 'product' | 'blog' | 'event' | 'page',
        category: 'category' in item ? (item.category as string) : undefined,
        image: 'image' in item ? (item.image as string) : undefined,
        relevance: calculateRelevance(item, searchTerms)
      }))
      .filter(result => result.relevance > 0);

    // Filter by type if specified
    if (type && type !== 'all') {
      results = results.filter(result => result.type === type);
    }

    // Sort by relevance and limit results
    results = results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 20);

    const meta: SearchMeta = {
      total: results.length,
      query: sanitizedQuery,
      type: type || 'all'
    };

    return NextResponse.json({ 
      results,
      meta,
      success: true
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'CDN-Cache-Control': 'public, s-maxage=3600',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { 
        error: 'Search temporarily unavailable. Please try again later.',
        results: [],
        meta: { total: 0, query: '', type: 'all' },
        success: false
      }, 
      { status: 200 } // Return 200 to prevent frontend error
    );
  }
} 
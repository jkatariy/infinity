// Server component: no client runtime needed

interface StructuredDataProps {
  type: 'Organization' | 'Product' | 'Article' | 'LocalBusiness' | 'WebSite' | 'BreadcrumbList';
  data: Record<string, any>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };

    return JSON.stringify(baseSchema);
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateSchema() }}
    />
  );
}

// Predefined schema data
export const organizationSchema = {
  name: 'Infinity Automated Solutions',
  url: 'https://infinitysols.com',
  logo: 'https://infinitysols.com/logos/logo.png',
  description: 'Leading provider of secondary packaging machines and end-of-line packaging automation solutions for Food, FMCG, Personal Care, Textiles, and Pharmaceuticals since 2016. 800+ installations across India.',
  foundingDate: '2016',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot No. 7 & 16, S. No-1556/1559, Shelarwasti, Dehu-Alandi Road',
    addressLocality: 'Chikhali, Tal-Haveli',
    addressRegion: 'Pune',
    postalCode: '412114',
    addressCountry: 'IN'
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-84849-22042',
      contactType: 'sales',
      email: 'info@infinitysols.com',
      availableLanguage: ['English']
    },
    {
      '@type': 'ContactPoint',
      telephone: '+91-20-6718-3300',
      contactType: 'customer service',
      email: 'info@infinitysols.com',
      availableLanguage: ['English']
    }
  ],
  sameAs: [
    'https://www.linkedin.com/company/infinity-automated-solutions',
    'https://www.facebook.com/infinitysols',
    'https://twitter.com/infinitysols'
  ],
  industry: 'Industrial Automation',
  numberOfEmployees: '50-100',
  areaServed: ['IN', 'US', 'AE', 'DE', 'SG']
};

export const websiteSchema = {
  url: 'https://infinitysols.com',
  name: 'Infinity Automated Solutions',
  description: 'Leading provider of end-of-line packaging automation solutions',
  publisher: {
    '@type': 'Organization',
    name: 'Infinity Automated Solutions'
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://infinitysols.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

export const localBusinessSchema = {
  ...organizationSchema,
  '@type': 'LocalBusiness',
  businessType: 'Industrial Automation Company',
  paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
  currenciesAccepted: 'INR, USD, EUR',
  openingHours: 'Mo-Fr 09:00-18:00',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '18.6698',
    longitude: '73.7527'
  }
};

// Helper function to generate product schema
export const generateProductSchema = (product: {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  slug: string;
  specifications?: Array<{ label: string; value: string }>;
  applications?: string[];
}) => ({
  name: product.title,
  description: product.description,
  image: [product.image],
  brand: {
    '@type': 'Brand',
    name: 'Infinity Automated Solutions'
  },
  manufacturer: {
    '@type': 'Organization',
    name: 'Infinity Automated Solutions',
    url: 'https://infinitysols.com'
  },
  sku: product.id,
  mpn: product.id.toUpperCase(),
  category: product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
  url: `https://infinitysols.com/${product.slug}`,
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'INR',
    seller: {
      '@type': 'Organization',
      name: 'Infinity Automated Solutions'
    }
  },
  ...(product.applications && {
    applicationCategory: product.applications.slice(0, 5)
  }),
  ...(product.specifications && {
    additionalProperty: product.specifications.slice(0, 10).map(spec => ({
      '@type': 'PropertyValue',
      name: spec.label,
      value: spec.value
    }))
  })
});

// Helper function to generate breadcrumb schema
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }))
}); 
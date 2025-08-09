import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industries Served - Packaging Automation Solutions | Infinity',
  description: 'Discover how Infinity Automated Solutions serves diverse industries including food & beverage, pharmaceuticals, personal care, automotive, chemical, and e-commerce with specialized packaging automation.',
  keywords: 'packaging automation industries, food beverage automation, pharmaceutical packaging, personal care automation, automotive packaging, chemical industry automation, e-commerce packaging',
  openGraph: {
    title: 'Industries Served - Packaging Automation Solutions | Infinity',
    description: 'Discover how Infinity Automated Solutions serves diverse industries including food & beverage, pharmaceuticals, personal care, automotive, chemical, and e-commerce with specialized packaging automation.',
    url: 'https://infinitysols.com/industries',
  },
  alternates: {
    canonical: 'https://infinitysols.com/industries',
  },
};

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 
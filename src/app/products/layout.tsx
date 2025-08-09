import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions - Packaging Automation Equipment | Infinity Solutions',
  description: 'Explore our comprehensive range of packaging automation solutions including bundling machines, cartoning systems, case packers, checkweighers, and conveying solutions for various industries.',
  keywords: 'packaging automation solutions, bundling machines, cartoning equipment, case packers, checkweighers, conveying systems, industrial automation equipment',
  openGraph: {
    title: 'Solutions - Packaging Automation Equipment | Infinity Solutions',
    description: 'Explore our comprehensive range of packaging automation solutions including bundling machines, cartoning systems, case packers, checkweighers, and conveying solutions for various industries.',
    url: 'https://infinitysols.com/products',
  },
  alternates: {
    canonical: 'https://infinitysols.com/products',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 
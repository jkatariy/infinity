import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Industrial Automation Experts | Infinity Solutions',
  description: 'Learn about Infinity Automated Solutions - over a decade of experience in packaging automation, serving 400+ satisfied clients across global industries with innovative engineering solutions.',
  keywords: 'about infinity automated solutions, packaging automation company, industrial automation experts, engineering solutions, automation experience',
  openGraph: {
    title: 'About Us - Industrial Automation Experts | Infinity Solutions',
    description: 'Learn about Infinity Automated Solutions - over a decade of experience in packaging automation, serving 400+ satisfied clients across global industries with innovative engineering solutions.',
    url: 'https://infinitysols.com/about',
  },
  alternates: {
    canonical: 'https://infinitysols.com/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 
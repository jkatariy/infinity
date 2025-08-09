import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch | Infinity Automated Solutions',
  description: 'Contact Infinity Automated Solutions for packaging automation inquiries. Located in Pune, India. Call +91-20-67183300 or email info@infinitysols.com for expert automation solutions.',
  keywords: 'contact infinity automated solutions, packaging automation inquiry, automation experts pune, industrial automation contact, packaging solutions quote',
  openGraph: {
    title: 'Contact Us - Get in Touch | Infinity Automated Solutions',
    description: 'Contact Infinity Automated Solutions for packaging automation inquiries. Located in Pune, India. Call +91-20-67183300 or email info@infinitysols.com for expert automation solutions.',
    url: 'https://infinitysols.com/contact',
  },
  alternates: {
    canonical: 'https://infinitysols.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 
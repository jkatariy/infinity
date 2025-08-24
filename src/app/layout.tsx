import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import ClientProviders from '../components/ClientProviders';
import dynamic from 'next/dynamic';
import StructuredData, { organizationSchema, websiteSchema } from '../components/StructuredData';
import GoogleAnalytics from '../components/GoogleAnalytics';
import Defer from '../components/Defer';
import LayoutContent from '../components/LayoutContent';
// Render FloatingAssistant with SSR enabled to avoid bailing out the whole layout to CSR
const FloatingAssistant = dynamic(() => import('../components/FloatingAssistant'), { ssr: true });

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://infinitysols.com'),
  title: "Infinity Automated Solutions - Secondary Packaging & End-of-Line Automation",
  description: "Leading provider of secondary packaging machines and end-of-line packaging solutions for Food, FMCG, Personal Care, Textiles, and Pharmaceuticals since 2016. Based in Pune, India.",
  keywords: "secondary packaging automation, end-of-line packaging, case packers, cartoning machines, bundling machines, check weighers, conveying solutions, FMCG packaging, Pune automation",
  authors: [{ name: "Infinity Automated Solutions" }],
  creator: "Infinity Automated Solutions",
  publisher: "Infinity Automated Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://infinitysols.com',
    title: 'Infinity Automated Solutions - Secondary Packaging & End-of-Line Automation',
    description: 'Leading provider of secondary packaging machines and end-of-line packaging solutions for Food, FMCG, Personal Care, Textiles, and Pharmaceuticals since 2016. Based in Pune, India.',
    siteName: 'Infinity Automated Solutions',
    images: [
      {
        url: '/logos/logo.png',
        width: 1200,
        height: 630,
        alt: 'Infinity Automated Solutions Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinity Automated Solutions - Packaging Automation Experts',
    description: 'Leading provider of end-of-line packaging automation solutions including bundling, wrapping, cartoning, and conveying systems for global industries since 2010.',
    images: ['/logos/logo.png'],
    creator: '@infinitysols',
  },
  verification: {
    google: 'your-google-verification-code', // Add your actual Google verification code
  },
  alternates: {
    canonical: 'https://infinitysols.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://zxvhgpejwgrlxksnqtxk.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="//i.ytimg.com" />
        <meta name="theme-color" content="#0f4277" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="color-scheme" content="light" />
        {/* Preload critical resources only on home page */}
        <link rel="preload" as="image" href="/logos/logo.png" fetchPriority="high" />
        {/* reCAPTCHA Script */}
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </head>
      <body className={inter.className + ' antialiased'} suppressHydrationWarning>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-blue-700 focus:px-3 focus:py-2 focus:rounded">Skip to main content</a>
        <Defer timeoutMs={1500}>
          <GoogleAnalytics />
        </Defer>
        <StructuredData type="Organization" data={organizationSchema} />
        <StructuredData type="WebSite" data={websiteSchema} />
        <ClientProviders>
          <LayoutContent>
            {children}
            <FloatingAssistant />
          </LayoutContent>
        </ClientProviders>
      </body>
    </html>
  );
}
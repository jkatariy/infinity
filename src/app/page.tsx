import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroVideo from '@/components/HeroVideo';
const TickerAnimation = dynamic(() => import('@/components/TickerAnimation'), { ssr: true, loading: () => null });
const AboutUs = dynamic(() => import('@/components/AboutUs'), { ssr: true, loading: () => null });
// Heavy media/iframes: safely hydrate on client only
const FeaturedVideo = dynamic(() => import('@/components/FeaturedVideo'), { ssr: false, loading: () => null });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: true, loading: () => null });
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: true, loading: () => null });
const Clientele = dynamic(() => import('@/components/Clientele'), { ssr: true, loading: () => null });
// Map is heavy; hydrate client-side only
const MapSection = dynamic(() => import('@/components/MapSection'), { ssr: false, loading: () => null });

export const metadata: Metadata = {
  title: 'Packaging Automation Solutions | Infinity Automated Solutions',
  description: 'Leading provider of secondary packaging machines and end-of-line automation for Food, FMCG, Personal Care, and Pharmaceuticals. 800+ installations since 2015.',
  keywords: 'secondary packaging automation, case packers, cartoning machines, bundling solutions, check weighers, conveying systems, FMCG automation, Pune packaging machinery',
  openGraph: {
    title: 'Packaging Automation Solutions | Infinity Automated Solutions',
    description: 'Leading provider of secondary packaging machines and end-of-line automation for Food, FMCG, Personal Care, and Pharmaceuticals. 800+ installations since 2015.',
    url: 'https://infinitysols.com',
  },
  alternates: {
    canonical: 'https://infinitysols.com',
  },
};

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen" tabIndex={-1}>
      <HeroVideo />
      <div className="[content-visibility:auto] [contain-intrinsic-size:1px_800px]">
        <TickerAnimation />
      </div>

      <div className="[content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <AboutUs />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <FeaturedVideo />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <Clientele />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:1px_900px]">
        <Testimonials />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:1px_700px]">
        <FAQ />
      </div>
      <div className="[content-visibility:auto] [contain-intrinsic-size:1px_700px]">
        <MapSection />
      </div>
    </main>
  );
}

"use client";
import dynamic from 'next/dynamic';
import Defer from '@/components/Defer';

const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false });
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Defer timeoutMs={800}>
        <BackToTop />
      </Defer>
      <Defer timeoutMs={1200}>
        <CookieBanner />
      </Defer>
    </>
  );
} 
"use client";
import BackToTop from "@/components/BackToTop";
import CookieBanner from "@/components/CookieBanner";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BackToTop />
      <CookieBanner />
    </>
  );
} 
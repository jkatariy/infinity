'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname();
  
  // Check if current route is dashboard or login related
  const isDashboardRoute = pathname?.startsWith('/dashboard');
  const isHRDashboardRoute = pathname?.startsWith('/hr-dashboard');
  const isCMDDashboardRoute = pathname?.startsWith('/cmd-dashboard');
  const isLoginRoute = pathname?.startsWith('/login');
  const isAuthRoute = isDashboardRoute || isHRDashboardRoute || isCMDDashboardRoute || isLoginRoute;

  return (
    <>
      {!isAuthRoute && <Header />}
      <main className={!isAuthRoute ? 'pt-20' : ''}>
        {children}
      </main>
      {!isAuthRoute && <Footer />}
    </>
  );
} 
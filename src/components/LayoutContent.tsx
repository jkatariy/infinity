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
  const isLoginRoute = pathname?.startsWith('/login');
  const isAuthRoute = isDashboardRoute || isLoginRoute;

  return (
    <>
      {!isAuthRoute && <Header />}
      {children}
      {!isAuthRoute && <Footer />}
    </>
  );
} 
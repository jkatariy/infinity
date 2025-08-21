'use client';

import { useEffect, useState } from 'react';

type DeferProps = {
  children: React.ReactNode;
  timeoutMs?: number;
};

export default function Defer({ children, timeoutMs = 1200 }: DeferProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = () => !cancelled && setReady(true);
    const ric = (window as any).requestIdleCallback as undefined | ((cb: () => void, opts?: any) => number);
    let idleId: number | undefined;
    let timerId: number | undefined;

    if (typeof window !== 'undefined') {
      if (typeof ric === 'function') {
        idleId = ric(run, { timeout: timeoutMs });
      }
      timerId = window.setTimeout(run, timeoutMs);
    }
    return () => {
      cancelled = true;
      if (idleId && typeof (window as any).cancelIdleCallback === 'function') {
        (window as any).cancelIdleCallback(idleId);
      }
      if (timerId) window.clearTimeout(timerId);
    };
  }, [timeoutMs]);

  if (!ready) return null;
  return <>{children}</>;
}



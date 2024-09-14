import { type PropsWithChildren } from 'react';
import { useHydrated } from '../hooks/useHydrated';

interface ClientOnlyProps extends PropsWithChildren {
  fallback?: React.ReactNode;
  
}

export function ClientOnly({ children, fallback }: ClientOnlyProps) {
  const hydrated = useHydrated();
  return hydrated ? children : fallback;
}

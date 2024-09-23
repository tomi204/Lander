'use client';

import { useHydrated } from '@/hooks/useHydrated';
import RealStateDetailContainer from './DetailContainer';
import __realState from '@/data/jsons/__realState.json';
export default function RealStateId() {
  return (
    <div>
      {useHydrated() && <RealStateDetailContainer property={__realState[0]} />}
    </div>
  );
}

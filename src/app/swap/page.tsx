'use client';
import { Swap } from '../../components/Swap/index';

export default function SwapPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-yellow-500 mb-8 text-center">
        Swap / Bridge
      </h1>
      <Swap />
    </div>
  );
}

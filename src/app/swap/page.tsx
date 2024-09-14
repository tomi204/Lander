'use client';
import { Dialog, DialogHeader } from '@/components/ui/dialog';
import { Swap } from '../../components/Swap/index';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

export default function SwapPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-yellow-500 mb-8 text-center">
        Swap / Bridge
      </h1>

      <Swap />
    </div>
  );
}

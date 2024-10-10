'use client';

import { LiFiWidget, WidgetSkeleton } from '@lifi/widget';
import React from 'react';
import type { WidgetConfig } from '@lifi/widget';
import SwapComponents from '../../blockchain/Coinbase/Swap';
import { useBlockchain } from '@/contexts/BlockchainContext';
import ConnectModal from '../ConnectWalletModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Swap = () => {
  const { address } = useBlockchain();
  const config = {
    appearance: 'light',
    toChain: 56,
    theme: {},
  } as Partial<WidgetConfig>;
  return (
    <>
      {address ? (
        <section className="flex flex-col m-auto justify-center items-center">
          <Tabs defaultValue="Swap" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="Swap">Swap</TabsTrigger>
              <TabsTrigger value="Bridge">Bridge</TabsTrigger>
            </TabsList>
            <TabsContent value="Swap">
              <section className=" m-auto flex items-center justify-center">
                <SwapComponents />
              </section>
            </TabsContent>
            <TabsContent value="Bridge">
              <React.Suspense fallback={<WidgetSkeleton config={config} />}>
                <LiFiWidget
                  config={config}
                  toChain={56}
                  integrator="nextjs-example"
                />
              </React.Suspense>
            </TabsContent>
          </Tabs>
        </section>
      ) : (
        <ConnectModal />
      )}
    </>
  );
};

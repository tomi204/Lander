'use client';

import { LiFiWidget, WidgetSkeleton } from '@lifi/widget';
import React, { useState } from 'react';
import type { WidgetConfig } from '@lifi/widget';
import SwapComponents from '../../blockchain/Coinbase/Swap';
import { useBlockchain } from '@/contexts/BlockchainContext';
import ConnectModal from '../ConnectWalletModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TokenSearch } from '@coinbase/onchainkit/token';

import { getTokens } from '@coinbase/onchainkit/api';
import type { Token } from '@coinbase/onchainkit/token';
import { useCallback } from 'react';
export const Swap = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const { address } = useBlockchain();
  const config = {
    appearance: 'light',
    toChain: 56,
    theme: {},
  } as Partial<WidgetConfig>;

  const handleChange = useCallback((value: string) => {
    async function getData(value: string) {
      const response = await getTokens({ search: value });
      //  setTokens(response);
      setTokens(response as Token[]);
      console.log(response);
      if ('tokens' in response) {
        console.log(response);
      } else {
        console.error('Error fetching tokens:', response);
      }
    }
    getData(value);
  }, []);
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
              <section className=" m-auto flex flex-col items-center justify-center">
                <TokenSearch onChange={handleChange} delayMs={200} />

                <SwapComponents tokens={tokens} />
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

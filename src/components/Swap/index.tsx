'use client';

import { LiFiWidget, WidgetSkeleton } from '@lifi/widget';
import React, { useState } from 'react';
import type { WidgetConfig } from '@lifi/widget';
import SwapComponents from '../../blockchain/Coinbase/Swap';
import { useBlockchain } from '@/contexts/BlockchainContext';
import ConnectModal from '../ConnectWalletModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TokenChip, TokenSearch } from '@coinbase/onchainkit/token';

import { getTokens } from '@coinbase/onchainkit/api';
import type { Token } from '@coinbase/onchainkit/token';
import { useCallback } from 'react';
import { useAppKit } from '@reown/appkit/react';
export const Swap = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const { address } = useBlockchain();
  const { open } = useAppKit();
  const config = {
    appearance: 'light',
    toChain: 56,
    hiddenUI: ['poweredBy', 'walletMenu', 'drawerCloseButton'],
    theme: {},
  } as Partial<WidgetConfig>;
  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
    setTokens([]);
  };

  const handleChange = useCallback((value: string) => {
    async function getData(value: string) {
      const response = await getTokens({ search: value });
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
                <TokenSearch
                  onChange={handleChange}
                  delayMs={100}
                  className="w-full"
                />
                <div className="flex flex-col items-center justify-center w-5/12 md:w-full sm:w-full">
                  {tokens.length > 0 && (
                    <ul className="mt-4 max-h-80 overflow-y-auto flex flex-col gap-2 justify-center items-center bg-[#e4e7eb] p-4 rounded-3xl w-full">
                      {tokens.map((token) => (
                        <li
                          key={token.address}
                          className="cursor-pointer font-bold w-full"
                          onClick={() => handleTokenSelect(token)}
                        >
                          <TokenChip
                            className="m-auto w-full items-center justify-center flex"
                            token={token}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <SwapComponents tokens={tokens} selectedToken={selectedToken} />
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

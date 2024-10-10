'use client';

import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { polygon } from '@reown/appkit/networks';
import { wagmiAdapter } from '@/constants/wagmi-config';
import { Config, cookieToInitialState, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
const projectId = 'ee0ce490d3a704e0950aa17edaf69837';
const metadata = {
  name: 'Lander',
  description: 'Welcome to Lander',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/'],
};

createAppKit({
  adapters: [new EthersAdapter(), wagmiAdapter],
  metadata,
  networks: [polygon],
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});
const queryClient = new QueryClient();

export function AppKit({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey="5ZREXMXAdVzQUQxyEPTD7LnRtgyWtCir"
          chain={{
            id: 8453,
            name: 'Base',
            nativeCurrency: {
              name: 'Base',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: {
              default: {
                http: ['https://base.rpc.infura.com/v3/YOUR-PROJECT-ID'],
              },
            },
          }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

'use client';

import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { polygon } from '@reown/appkit/networks';
import { wagmiAdapter } from '@/constants/wagmi-config';
import { Config, cookieToInitialState, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
const projectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_ID ||
  'ddddb6c7ffd11d2d6bae3dd88eff5f3a';

// const polygon = {
//   chainId: 137,
//   name: 'Polygon',
//   currency: 'MATIC',
//   explorerUrl: 'https://polygonscan.com',
//   rpcUrl: 'https://polygon-rpc.com',
// };

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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

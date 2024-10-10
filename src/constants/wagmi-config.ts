import { cookieStorage, createStorage, http } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, arbitrum, polygon } from '@reown/appkit/networks';

// Get projectId from https://cloud.reown.com
export const projectId = 'ddddb6c7ffd11d2d6bae3dd88eff5f3a';

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const networks = [polygon];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;

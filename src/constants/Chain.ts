export const base = {
  id: 8453,
  name: 'Base',
  nativeCurrency: {
    name: 'Base',
    symbol: 'ETH',
    decimals: 18,
  },

  rpcUrls: {
    default: {
      http: [
        `https://base-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
      ],
    },
  },
};

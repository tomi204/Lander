import '@coinbase/onchainkit/styles.css';
import { Token } from '@/interfaces/Token.interface';
export const TokensBase: Token[] = [
  {
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    chainId: 8453,
    decimals: 6,
    name: 'USDC',
    payable: true,
    symbol: 'USDC',
    image:
      'https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png',
  },
  {
    address: '',
    chainId: 8453,
    decimals: 18,
    name: 'Ethereum',
    payable: false,
    symbol: 'ETH',
    image:
      'https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png',
  },
  {
    address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
    chainId: 8453,
    decimals: 18,
    payable: true,
    name: 'DAI',
    symbol: 'DAI',
    image: 'https://basescan.org/token/images/daistablecoin_32.png',
  },
  {
    address: '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
    chainId: 8453,
    decimals: 18,
    name: 'cbETH',
    payable: false,
    symbol: 'cbETH',
    image:
      'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/bd/10/bd10e95f8df784eab33c02267aae56be22db3140cc50d8e219203129cfe0a3ae-NGIxMTcxZjctMDI2ZS00NzA1LWI1OTUtNGViNGIxMGFiNzM3',
  },
  {
    address: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
    chainId: 8453,
    decimals: 8,
    name: 'cbBTC',
    payable: false,
    symbol: 'cbBTC',
    image: 'https://go.wallet.coinbase.com/static/CBBTCMedium.png',
  },
  {
    address: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
    chainId: 8453,
    decimals: 6,
    name: 'USDbC',
    payable: true,
    symbol: 'USDbC',
    image: '',
  },
  {
    address: '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452',
    chainId: 8453,
    decimals: 18,
    name: 'wstETH',
    payable: false,
    symbol: 'wstETH',
    image:
      'https://assets.coingecko.com/coins/images/17876/large/Lido_stETH2.png?1700042378',
  },
];

export const TokensPolygon: Token[] = [
  {
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    chainId: 137,
    decimals: 18,
    name: 'USDT',
    symbol: 'USDT',
    payable: true,
    image:
      'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668142065',
  },
  {
    address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    chainId: 137,
    decimals: 6,
    name: 'USDC',
    payable: true,
    symbol: 'USDC',
    image:
      'https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png',
  },
];

import { Address, formatUnits, parseUnits } from 'viem';

interface Addresses {
  [key: string]: Address;
}

export const bscAddresses: Addresses = {
  USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  P2P: '0x6e1180674368878f6b67E1DCB6E4DFd0C102703A',
  TOKENIZATION: '0x4040404040404040404040404040404040404040',
  NFT_TEST_1: '0xFBD7db87dc03aE643Ca8a128f32C3bee4c89EB4d',
};

export const bscTestnetAddresses: Addresses = {
  tokenization: '0x6e1180674368878f6b67E1DCB6E4DFd0C102703A',
  erc20: '0x6e1180674368878f6b67E1DCB6E4DFd0C102703A',
};

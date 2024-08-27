import { Address, formatUnits, parseUnits } from 'viem';

interface Addresses {
  [key: string]: Address;
}

export const bscAddresses: Addresses = {
  USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  P2P: '0x6e1180674368878f6b67E1DCB6E4DFd0C102703A',
};

export const polygonAddresses: Addresses = {
  USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  P2P: '0x4e64Fe17942b341AB3B7c9f1fA6870c83d2Ed38E',
};

export const arbitrumAddresses: Addresses = {
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  P2P: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
};

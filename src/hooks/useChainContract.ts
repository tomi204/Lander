import { polygonAddresses, baseAddresses } from '@/constants/addresses';

export const useChainContract = (chainId: number) => {
  const contract = chainId === 8453 ? baseAddresses.P2P : polygonAddresses.P2P;
  console.log(contract, 'contract');
  return contract;
};

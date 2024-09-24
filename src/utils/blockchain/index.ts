'use client';

import { useCallback } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import { Interface } from 'ethers';
import { sendTransaction, getConnections } from '@wagmi/core';
import { Address, parseUnits } from 'viem';
import { wagmiConfig } from '@/constants/wagmi-config';
import { bscAddresses } from '@/constants/addresses';
import { ABI, NFT_ABI } from '../../utils/ABI';
import { waitForTransactionReceipt, getTransactionReceipt } from '@wagmi/core';

export async function ApproveTokens() {
  try {
    const connections = getConnections(wagmiConfig);
    const dataEncoded = new Interface(ABI).encodeFunctionData('approve', [
      bscAddresses.NFT_TEST_1,
      parseUnits('10000', 18),
    ]) as `0x${string}`;

    const hash = await sendTransaction(wagmiConfig, {
      connector: connections[0]?.connector,
      data: dataEncoded,
      to: bscAddresses.USDC,
      value: BigInt(0),
    });

    const data = await waitForTransactionReceipt(wagmiConfig, {
      hash: hash,
    });

    console.log(data.status === 'success' ? 'Approved' : 'Not Approved');
    if (data.status === 'success') {
      return hash;
    }
    return hash;
  } catch (error) {
    console.error('Error approving tokens:', error);
    throw error;
  }
}

export async function MintUSDC({ address }: { address: Address }) {
  try {
    const connections = getConnections(wagmiConfig);
    const dataEncoded = new Interface(NFT_ABI).encodeFunctionData('mintUSDC', [
      BigInt(1),
      address,
    ]) as `0x${string}`;
    const hash = await ApproveTokens();
    const txResponse = await getTransactionReceipt(wagmiConfig, {
      hash: hash,
    });
    const hashMint = await sendTransaction(wagmiConfig, {
      connector: connections[0]?.connector,
      data: dataEncoded,
      to: bscAddresses.NFT_TEST_1,
    });
    const data = await waitForTransactionReceipt(wagmiConfig, {
      hash: hashMint,
    });
    console.log(data.status === 'success' ? 'Minted' : 'Not Minted');

    if (data.status === 'success') {
      return hashMint;
    }
    return hashMint;
  } catch (error) {
    console.error('Error minting USDC:', error);
    throw error;
  }
}

'use client';

import { useCallback } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import { Interface } from 'ethers';
import { sendTransaction, getConnections } from '@wagmi/core';
import { Address, parseUnits } from 'viem';
import { wagmiConfig } from '@/constants/wagmi-config';

import { bscAddresses } from '@/constants/addresses';
import { ABI, NFT_ABI } from '../../utils/ABI';
import { waitForTransactionReceipt } from '@wagmi/core';

export async function ApproveTokens() {
  try {
    const connections = getConnections(wagmiConfig);
    const dataEncoded = new Interface(ABI).encodeFunctionData('approve', [
      bscAddresses.P2P,
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
  } catch (error) {
    console.error('Error approving tokens:', error);
    throw error;
  }
}
////// implement this
//    function mintUSDC(uint256 quantity, address to) external whenNotPaused {
//     if (_totalMinted() + quantity > maxSupply) revert ExceedsMaxSupply();

//     uint256 totalCost = price * quantity;
//     if (!usdcToken.transferFrom(msg.sender, owner(), totalCost)) {
//       revert ERC20TransferFailed();
//     }

//     _safeMint(to, quantity);
//     emit NftMinted(msg.sender, 'USDC', quantity);
//   }

export async function MintUSDC({ address }: { address: Address }) {
  try {
    await ApproveTokens();
    const connections = getConnections(wagmiConfig);
    const dataEncoded = new Interface(NFT_ABI).encodeFunctionData('mintUSDC', [
      BigInt(1),
      address,
    ]) as `0x${string}`;

    const hash = await sendTransaction(wagmiConfig, {
      connector: connections[0]?.connector,
      data: dataEncoded,
      to: bscAddresses.NFT_TEST_1,
      value: BigInt(0),
    });

    const data = await waitForTransactionReceipt(wagmiConfig, {
      hash: hash,
    });
    console.log(data.status === 'success' ? 'Minted' : 'Not Minted');
    if (data.status === 'success') {
      return hash;
    }
  } catch (error) {
    console.error('Error minting USDC:', error);
    throw error;
  }
}

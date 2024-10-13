'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';

import { useAuth } from '@/contexts/AuthContext';

import { updateBookingStatus } from '@/services/books';
import { useTransaction } from '@/contexts/CheckoutProvider';
import { useRouter } from 'next/navigation';

import Notiflix from 'notiflix';
import { Address, erc20Abi } from 'viem';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { polygonAddresses } from '@/constants/addresses';
import { Contract, ethers } from 'ethers';
import { TokensBase, TokensPolygon } from '@/constants/Tokens';
import { Token, TokenChip } from '@coinbase/onchainkit/token';
import {
  Connection,
  Transaction,
  SystemProgram,
  clusterApiUrl,
  PublicKey,
} from '@solana/web3.js';

import { useEthersSigner, useEthersProvider } from '@/blockchain';
import { config } from '@/constants/wagmi-config';
interface ContractInteractionProps {
  disabled?: boolean;
  amount: number;
  sellerAddress: Address;
  onTxSent?: (hash: string) => void;
  onTxError?: (error: any) => void;
  transactionId?: number;
  owner_wallet: string;
  buyer_wallet: string;
  owner_id: string;
  buyer_id: string;
  tokenAddress: string;
  tokenName: string;
  property_id: string;
}

const BuyButton: FC<ContractInteractionProps> = ({
  property_id,
  onTxError,
  onTxSent,
  disabled,
  amount,
  sellerAddress,
  owner_id,
  buyer_id,
  transactionId,
  owner_wallet,
  buyer_wallet,
  tokenName,
  tokenAddress,
}) => {
  const [symbol, setSymbol] = useState('--');
  const [noFunds, setNoFunds] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { address, isConnected, chain } = useBlockchain();
  const { transaction, setTransaction } = useTransaction() || {};
  const router = useRouter();
  const provider = useEthersProvider();
  const signer = useEthersSigner();
  async function CreateTransaction() {
    try {
      setLoading(true);
      setErrorMessage('');

      if (!address) {
        throw new Error('Invalid Address');
      }

      const erc20Contract = new Contract(tokenAddress, erc20Abi, signer);

      const decimals = await erc20Contract.decimals();
      console.log(decimals, 'decimals');
      const parsedAmount = ethers.parseUnits(
        transaction.amount.toString(),
        Number(decimals)
      );
      const tx = await erc20Contract
        .transfer(polygonAddresses.P2P, parsedAmount)
        .catch((err) => {
          Notiflix.Notify.failure('Error:' + err);
        });

      const receipt = await tx.wait();
      const data = await provider?.getTransactionReceipt(tx?.hash);

      if (data && data.logs.length > 0) {
        const transferEventAbi = [
          'event Transfer(address indexed from, address indexed to, uint256 value)',
        ];
        const iface = new ethers.Interface(transferEventAbi);

        for (const log of data.logs) {
          try {
            const parsedLog = iface.parseLog(log);

            if (parsedLog) {
              const { from, to, value } = parsedLog.args;

              const transactionInfo = {
                amount: ethers.formatUnits(value, Number(decimals)),
                from: from,
                to: to,
                decimals: Number(decimals),
                token: polygonAddresses.USD,
              };

              const txID = await updateBookingStatus({
                bookingId: transaction?.id,
                status: 'pending',
                txHash: tx.hash,
                chain: 'pol',
                owner_id,
                buyer_id,
                owner_wallet,
                buyer_wallet,
                property_id,
                transactionInfo: transactionInfo,
              });

              router.push(`/p2p/${txID}`);
            }
          } catch (err) {
            console.error('Error parsing log:', err);
          }
        }

        Notiflix.Notify.success('Transaction created');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Transaction failed');

      if (onTxError) {
        onTxError(error);
      }
    } finally {
      setLoading(false);
    }
  }
  const token = TokensPolygon?.find((token) => token.name === tokenName);
  // const handleSend = async () => {
  //   if (!publicKey) {
  //     console.error('No se ha conectado a la billetera.');
  //     return;
  //   }

  //   const toAddress = 'C46KB5iG71zwaoQRyVtVEfZe95kaNRD6YYqeUnKcZWs';
  //   const amount = 1000000;
  //   const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  //   const transactionSol = new Transaction().add(
  //     SystemProgram.transfer({
  //       fromPubkey: publicKey,
  //       toPubkey: new PublicKey(toAddress),
  //       lamports: amount,
  //     })
  //   );

  //   try {
  //     const signature = await sendTransaction(transactionSol, connection);
  //     console.log('Transacción enviada con éxito. ID:', signature);
  //     const transactionInfo = {
  //       amount: ethers.formatUnits(amount, 9),
  //       from: address as string,
  //       to: toAddress,
  //       decimals: 9,
  //       token: 'native',
  //     };
  //     const txID = await updateBookingStatus({
  //       bookingId: transaction?.id as string,
  //       status: 'pending',
  //       txHash: signature,
  //       chain: 'sol',
  //       owner_wallet,
  //       buyer_wallet,
  //       transactionInfo: transactionInfo,
  //       buyer_id,
  //       owner_id,
  //     });

  //     console.log(txID, 'txID');
  //   } catch (error) {
  //     console.error('Error al enviar SOL:', error);
  //   }
  // };
  return (
    <>
      {!transactionId && chain === 'evm' && (
        <section onClick={CreateTransaction}>
          <TokenChip token={token as Token} className="bg-none" />
        </section>
      )}
      {/* {chain === 'solana' && (
        <section onClick={handleSend}>
          <Button className="bg-violet-700 text-white rounded-3xl">
            Buy with Sol
          </Button>
        </section>
      )}

      {!isConnected && (
        <h3 className="flex-grow text-left text-sm font-medium text-red-700 mt-1 sm:w-full sm:text-center sm:text-sm">
          Please, connect your wallet.
        </h3>
      )} */}
    </>
  );
};

export default BuyButton;

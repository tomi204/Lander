'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import ButtonPrimary from '@/shared/ButtonPrimary';
import { Interface } from 'ethers';

import { useAuth } from '@/contexts/AuthContext';
import {
  sendTransaction,
  getConnections,
  getBalance,
  readContract,
} from '@wagmi/core';
import { Address, parseUnits } from 'viem';
import { wagmiConfig } from '@/constants/wagmi-config';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { bscAddresses } from '@/constants/addresses';
import { ABI } from '../../utils/ABI';
import { waitForTransactionReceipt, getTransactionReceipt } from '@wagmi/core';
import { updateBookingStatus } from '@/services/books';
import { useTransaction } from '@/contexts/CheckoutProvider';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { showConfetti } from '@/hooks/useConfetti';
import Notiflix from 'notiflix';

interface ContractInteractionProps {
  disabled?: boolean;
  amount: number;
  sellerAddress: Address;
  onTxSent?: (hash: string) => void;
  onTxError?: (error: any) => void;
  transactionId?: number;
  owner_wallet: string;
  buyer_wallet: string;
}

const ContractInteraction: FC<ContractInteractionProps> = ({
  onTxError,
  onTxSent,
  disabled,
  amount,
  sellerAddress,
  transactionId,
  owner_wallet,
  buyer_wallet,
}) => {
  const [symbol, setSymbol] = useState('--');
  const [noFunds, setNoFunds] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const { isAuth } = useAuth();
  const { transaction, setTransaction } = useTransaction() || {};
  const router = useRouter();
  //const { toast } = useToast();

  const getWalletBalance = useCallback(async () => {
    if (!address) {
      return;
    }

    const balance = await getBalance(wagmiConfig, {
      address,
      token: bscAddresses.USDC,
    });

    setSymbol(balance.symbol);
    setNoFunds(amount > balance.value);
    return balance;
  }, [address, amount]);

  useEffect(() => {
    getWalletBalance();
  }, [getWalletBalance]);

  const [approvedHash, setApprovedHash] = useState(
    '0x${string}' as `0x${string}`
  );
  const approveTokens = useCallback(async () => {
    try {
      const connections = getConnections(wagmiConfig);
      const dataEncoded = new Interface(ABI).encodeFunctionData('approve', [
        bscAddresses.P2P,
        parseUnits(amount.toString(), 18),
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

      setApprovedHash(hash);
      const txResponse = await getTransactionReceipt(wagmiConfig, {
        hash: hash,
      });
      console.log(txResponse);

      Notiflix.Notify.success('Tokens Approved');
      if (data.status === 'success') {
        return hash;
      }
    } catch (error) {
      console.error('Error approving tokens:', error);
      throw error;
    }
  }, [ABI, amount]);

  const [step, setStep] = useState('');

  const [actualId, setActualId] = useState(0);
  const { data: transactionCount, isLoading } = useReadContract({
    address: bscAddresses.P2P,
    abi: ABI,
    functionName: 'transactionCount',
  });

  console.log(transactionCount, 'transactionCount');

  const CreateTransaction = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage('');

      console.log(Number(transactionCount), 'transactionCount');

      if (!address) {
        throw new Error('Invalid Address');
      }
      const tokensApproved = await readContract(wagmiConfig, {
        address: bscAddresses.USDC,
        abi: [
          {
            constant: true,
            inputs: [
              { name: 'owner', type: 'address' },
              { name: 'spender', type: 'address' },
            ],
            name: 'allowance',
            outputs: [{ name: '', type: 'uint256' }],
            type: 'function',
          },
        ],
        functionName: 'allowance',
        args: [address, bscAddresses.P2P],
      });

      if (Number(tokensApproved as number) < Number(amount)) {
        setStep('Approving tokens');
        await approveTokens();
      }

      if (step === 'Approving tokens') {
        setTimeout(() => {
          setStep('Creating transaction');
        }, 15000);
      }

      if (step === '') {
        setStep('Creating transaction');
      }

      const dataEncoded = new Interface(ABI).encodeFunctionData(
        'createTransaction',
        [sellerAddress, BigInt(amount * 1000000 * 1000000)]
      ) as `0x${string}`;

      const connections = getConnections(wagmiConfig);

      const result = await sendTransaction(wagmiConfig, {
        connector: connections[0]?.connector,
        data: dataEncoded,
        to: bscAddresses.P2P,
        value: BigInt(0),
      });

      console.log('result', result);

      console.log(result, 'result');

      await waitForTransactionReceipt(wagmiConfig, {
        hash: result,
      });

      if (Number(transactionCount) > 0) {
        setActualId(Number(transactionCount));
      }

      setActualId(Number(transactionCount) + 1);

      if (isLoading) {
        Notiflix.Loading.pulse();
      }
      if (isLoading) {
        setTimeout(() => {}, 10000);
      }
      const txID = await updateBookingStatus(
        transaction?.id,
        'pending',
        (Number(transactionCount) + 1).toString(),
        'bsc',
        owner_wallet,
        buyer_wallet
      );

      Notiflix.Loading.remove();

      Notiflix.Notify.success('Transaction created');

      console.log(txID, 'txID');

      if (txID) {
        showConfetti();

        router.push(`/p2p/${txID}`);
        return txID;
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
  }, [ABI, amount, approveTokens, onTxError, onTxSent, sellerAddress, address]);

  const approveTransaction = useCallback(
    async (transactionId: number) => {
      try {
        setLoading(true);
        setErrorMessage('');

        const dataEncoded = new Interface(ABI).encodeFunctionData(
          'approveTransaction',
          [transactionId]
        ) as `0x${string}`;

        const connections = getConnections(wagmiConfig);

        const hash = await sendTransaction(wagmiConfig, {
          connector: connections[0]?.connector,
          data: dataEncoded,
          to: bscAddresses.P2P,
          value: BigInt(0),
        });

        if (onTxSent) {
          onTxSent(hash);
          Notiflix.Notify.success('Transaction Approved');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Transaction approval failed');

        if (onTxError) {
          onTxError(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [ABI, onTxError, onTxSent]
  );

  const cancelTransaction = useCallback(
    async (transactionId: number) => {
      try {
        setLoading(true);
        setErrorMessage('');

        const dataEncoded = new Interface(ABI).encodeFunctionData(
          'cancelTransaction',
          [transactionId]
        ) as `0x${string}`;

        const connections = getConnections(wagmiConfig);

        const hash = await sendTransaction(wagmiConfig, {
          connector: connections[0]?.connector,
          data: dataEncoded,
          to: bscAddresses.P2P,
          value: BigInt(0),
        });

        if (onTxSent) {
          onTxSent(hash);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Transaction cancellation failed');
        if (onTxError) {
          onTxError(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [ABI, onTxError, onTxSent]
  );

  console.log(loading, 'loading');

  return (
    <>
      {!transactionId && (
        <ButtonPrimary
          className="sm:w-full"
          loading={loading}
          onClick={CreateTransaction}
        >
          {step === ''
            ? 'Pay with USDC'
            : step === 'Approving tokens'
            ? 'Approving tokens'
            : 'Creating transaction'}
        </ButtonPrimary>
      )}

      {transactionId ? (
        <>
          <Button
            className="w-full bg-blue-300 hover:bg-blue-600 text-black"
            onClick={() => approveTransaction(transactionId)}
          >
            Approve Transaction
          </Button>

          {/* <Button
            className="w-full bg-blue-300 hover:bg-blue-600 text-black"
            disabled={!isAuth || noFunds || disabled}
            onClick={() => cancelTransaction(transactionId)}
          >
            Cancel Transaction
          </Button> */}
        </>
      ) : null}

      {!isConnected && (
        <h3 className="flex-grow text-left text-sm font-medium text-red-700 mt-1 sm:w-full sm:text-center sm:text-sm">
          Please, connect your wallet.
        </h3>
      )}
    </>
  );
};

export default ContractInteraction;

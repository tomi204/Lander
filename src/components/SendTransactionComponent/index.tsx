"use client";

import { FC, useCallback, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { Interface } from "ethers";

import { useAuth } from "@/contexts/AuthContext";
import { sendTransaction, getConnections, getBalance } from "@wagmi/core";
import { Address, formatUnits, parseUnits } from "viem";
import { wagmiConfig } from "@/constants/wagmi-config";
import { useAccount, useBalance } from "wagmi";
import { polygon } from "viem/chains";

const errorMaps: Record<string, string> = {
  UNPREDICTABLE_GAS_LIMIT: "Insufficient funds",
};

interface SendTransactionComponentProps {
  disabled: boolean;
  paymentId: string;
  txHash?: string;
  token: Address;
  ABI: Record<string, any>[];
  amount: number;
  receiptAddress: Address;
  onTxSent?: (hash: string) => void;
  onTxError?: (error: any) => void;
}

const SendTransactionComponent: FC<SendTransactionComponentProps> = ({
  onTxError,
  onTxSent,
  disabled,
  token,
  ABI,
  amount,
  receiptAddress,
  txHash,
}) => {
  const [symbol, setSymbol] = useState("--");
  const [noFunds, setNoFunds] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount();

  const { isAuth } = useAuth();

  useEffect(() => {}, []);

  const getWalletBalance = useCallback(async () => {
    if (!address) {
      return;
    }

    const balance = await getBalance(wagmiConfig, {
      address,
      token,
    });

    setSymbol(balance.symbol);
    setNoFunds(amount > balance.value);
    return balance;
  }, [address]);

  useEffect(() => {
    getWalletBalance();
  }, []);

  const onSendTxHandler = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      if (!address) {
        throw new Error("Invalid Address");
      }

      await getWalletBalance();
      const connections = getConnections(wagmiConfig);
      const dataEncoded = new Interface(ABI).encodeFunctionData("transfer", [
        receiptAddress,
        amount,
      ]) as `0x${string}`;

      const hash = await sendTransaction(wagmiConfig, {
        connector: connections[0]?.connector,
        data: dataEncoded,
        to: token,
        value: BigInt(0),
      });
      if (!onTxSent) {
        return;
      }
      onTxSent(hash);
    } catch (error) {
      console.error(error);
      setErrorMessage("Send founds failed");
      if (!onTxError) {
        return;
      }
      onTxError(error);
    } finally {
      setLoading(false);
    }
  }, [ABI, amount, onTxError, onTxSent, receiptAddress, token]);

  if (txHash) {
    return (
      <span className="flex-grow text-center text-sm font-medium text-neutral-700 ">
        Transaction hash: {txHash}
      </span>
    );
  }

  return (
    <>
      <ButtonPrimary
        className="sm:w-full"
        loading={loading}
        disabled={!isAuth || noFunds || disabled}
        onClick={onSendTxHandler}
      >
        Send Crypto
      </ButtonPrimary>

      {noFunds && (
        <h3 className="flex-grow text-left text-sm font-medium text-red-700 mt-1 sm:w-full sm:text-center sm:text-sm">
          Oops! It looks like you need a bit more tokens, around {formatUnits(BigInt(amount), 6)}{" "}
          {symbol}, to book your stay.
        </h3>
      )}

      {!isConnected && (
        <h3 className="flex-grow text-left text-sm font-medium text-red-700 mt-1 sm:w-full sm:text-center sm:text-sm">
          Please, connect your wallet.
        </h3>
      )}

      <h3 className="flex-grow text-left text-sm font-medium text-red-700 mt-1 sm:w-full sm:text-center sm:text-sm">
        {errorMessage}
      </h3>
    </>
  );
};

export default SendTransactionComponent;

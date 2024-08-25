import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { Address, Abi } from "viem";
import { polygonAddresses } from "@/constants/addresses";

// Configura la dirección del contrato y el ABI directamente en el hook
const CONTRACT_ADDRESS: Address = polygonAddresses.P2P; // Reemplaza con la dirección de tu contrato
const ABI: Abi = [
  // Reemplaza con el ABI de tu contrato
  {
    constant: true,
    inputs: [{ name: "transactionId", type: "uint256" }],
    name: "transactions",
    outputs: [
      { name: "buyer", type: "address" },
      { name: "seller", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "buyerApproval", type: "bool" },
      { name: "sellerApproval", type: "bool" },
      { name: "ownerApproval", type: "bool" },
      { name: "isCompleted", type: "bool" },
    ],
    type: "function",
    stateMutability: "view",
  },
];

interface TransactionInfo {
  buyer: Address;
  seller: Address;
  amount: bigint;
  buyerApproval: boolean;
  sellerApproval: boolean;
  ownerApproval: boolean;
  isCompleted: boolean;
}

export const useTransactionInfo = (transactionId: number) => {
  const [transactionInfo, setTransactionInfo] = useState<TransactionInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const {
    data,
    isError,
    error: fetchError,
    isLoading,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "transactions",
    args: [transactionId],
  });

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else if (isError) {
      setError(fetchError || new Error("Failed to fetch transaction info"));
      setLoading(false);
    } else if (data) {
      const [buyer, seller, amount, buyerApproval, sellerApproval, ownerApproval, isCompleted] =
        data as unknown as [Address, Address, bigint, boolean, boolean, boolean, boolean];
      setTransactionInfo({
        buyer,
        seller,
        amount,
        buyerApproval,
        sellerApproval,
        ownerApproval,
        isCompleted,
      });
      setLoading(false);
    }
  }, [data, isError, fetchError, isLoading]);

  return { transactionInfo, loading, error };
};

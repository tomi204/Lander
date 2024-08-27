import React from "react";
import { useTransactionInfo } from "@/hooks/useTransactionInfo";

const TransactionDetails: React.FC<{ transactionId: number }> = ({ transactionId }) => {
  const { transactionInfo, loading, error } = useTransactionInfo(transactionId);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!transactionInfo) {
    return <p>No transaction found.</p>;
  }

  return (
    <div>
      <h3>Transaction Details</h3>
      <p>Buyer: {transactionInfo.buyer}</p>
      <p>Seller: {transactionInfo.seller}</p>
      <p>Amount: {transactionInfo.amount.toString()}</p>
      <p>Buyer Approval: {transactionInfo.buyerApproval ? "Yes" : "No"}</p>
      <p>Seller Approval: {transactionInfo.sellerApproval ? "Yes" : "No"}</p>
      <p>Owner Approval: {transactionInfo.ownerApproval ? "Yes" : "No"}</p>
      <p>Is Completed: {transactionInfo.isCompleted ? "Yes" : "No"}</p>
    </div>
  );
};

export default TransactionDetails;


// CUANDO SE CREA EL ID 
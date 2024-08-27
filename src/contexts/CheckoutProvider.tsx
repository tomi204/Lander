// @jsxImportSource @next/bridge/client
"use client";
import React, { createContext, useContext ,useState} from 'react';

const TransactionContext = createContext<{ transaction: any; setTransaction: (t: any) => void } | undefined>(undefined);

// Provide the context value at a high level in your app
export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transaction, setTransaction] = useState(null);

  return (
    <TransactionContext.Provider value={{ transaction, setTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

// Custom hook to use the transaction context
export const useTransaction = () => useContext(TransactionContext);

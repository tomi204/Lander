import React, { FC, useMemo } from "react";
import Badge from "@/shared/Badge";
import Link from "next/link";
import { Book } from "@/interfaces/Booking";
import convertSelectedDateToString from "@/utils/converSelectedDateToString";
import { TwMainColor } from "@/data/types";
import { PaymentReleaseStatus, PaymentStatus } from "@/interfaces/Payment";
import WalletAddressComponent from "./WalletAddressComponent";
import CoinSymbolComponent from "./CoinSymbolComponent";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface BalanceCardProps {
  className?: string;
  available: number;
  balance: number;
  coin: string;
}

const BalanceCard: FC<BalanceCardProps> = ({
  className = "",
  available,
  balance,
  coin,
}) => {
  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col">
        <div className="block my-4">
          <h3 className="text-lg text-neutral-600 dark:text-neutral-400 font-normal">
            Account Balance
          </h3>
        </div>

        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-2"></div>

        <div className="grid grid-row-3 gap-2 mb-3">
          <div className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <i className="las la-balance-scale text-lg text-blue-500"></i>
                <span className="text-m text-neutral-500 dark:text-neutral-400">
                  {balance} {coin} - Balance
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <i className="las la-coins text-lg text-purple-500"></i>
              <span className="text-m text-neutral-500 dark:text-neutral-400">
                {available} {coin} - Available
              </span>
            </div>
          </div>
        </div>
        <div className="w-40 border-b border-neutral-200 dark:border-neutral-200 my-2"></div>

        <div className="block my-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
            Withdrawal Guidelines
          </span>
        </div>

        <div className="mt-2 mb-2">
          <span className="block w-70 text-sm text-neutral-500 dark:text-neutral-400 font-normal">
            You can withdraw funds if your available balance is greater than 0.
            If your available balance is less than your current balance, it
            indicates that the remaining funds will be released soon after the
            conditions in your reservations are met.
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl shadow-lg transition-shadow ${className}`}
    >
      <div className="grid md:grid-cols-1 sm:flex sm:flex-row ">
        {renderContent()}
      </div>
      <ButtonPrimary className="m-4" disabled={true}>
        Withdraw
      </ButtonPrimary>
      <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
        Coming soon!
      </span>
    </div>
  );
};

export default BalanceCard;

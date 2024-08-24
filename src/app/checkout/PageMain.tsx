"use client";

import React, { FC, useMemo, useState } from "react";
import convertSelectedDateToString from "@/utils/converSelectedDateToString";
import { Book } from "@/interfaces/Booking";
import SentTransactionComponent from "@/components/SendTransactionComponent";
import { StrapiData } from "@/interfaces/Strapi";
import { Payment, PaymentStatus } from "@/interfaces/Payment";
import { usePaymentUpdate } from "@/hooks/usePayment";
import CoinSymbolComponent from "@/components/CoinSymbolComponent";
import { useRouter } from "next/navigation";
import { Address } from "viem";
import CheckOutEmailForm from "@/components/CheckOutEmailForm/CheckOutEmailForm";

export interface CheckOutPagePageMainProps {
  book: Book;
  email?: string;
  phoneNumber?: string;
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
  book,
  email,
  phoneNumber,
}) => {
  const payment: StrapiData<Payment> = useMemo(() => book.payment, [book.payment]);
  const router = useRouter();
  const [hashTx, setHashTx] = useState<string>(payment.data.attributes.txHash);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const [{}, executeUpdatePayment] = usePaymentUpdate(book.payment.data.id);

  const onTxSentHandler = async (hash: string) => {
    if (!hash) {
      return;
    }

    try {
      setHashTx(hash);
      await executeUpdatePayment({
        data: {
          data: {
            status: PaymentStatus.inProcess,
            txHash: hash,
          },
        },
      });
      router.push(`/my-bookings`);
    } catch (error) {
      console.log(error);
    }
  };

  const onTxErrorHandler = (error: any) => {
    if (error.message) {
      setErrorMessage(error.message);
    }
  };

  const onFormStateChangeHandler = (isValid: boolean) => {
    setIsValidEmail(isValid);
  };

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col md:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="py-1 space-y-3">
            <div>
              <span className="text-base font-medium block">{book.stay.data.attributes.name}</span>
              <p className="text-sm text-neutral-500 mt-1 dark:text-neutral-400 line-clamp-1 break-words">
                {book.stay.data.attributes.address}
              </p>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              {book.stay.data.attributes.bedrooms} bedrooms · {book.stay.data.attributes.bathrooms}{" "}
              bathrooms
            </span>
            <div className="w-100 border-b border-neutral-200  dark:border-neutral-700"></div>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Price detail</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>
              {/* TODO: Format currency */}
              {book.priceNight}{" "}
              <CoinSymbolComponent contractAddress={payment.data.attributes.contractAddress} /> x{" "}
              {book.nights} nights
            </span>
            <span>{book.total}</span>
          </div>
          {book.payment.data.attributes.depositAmount > 0 && (
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span>Deposit Guaranty</span>
              <span>
                {book.payment.data.attributes.depositAmount}{" "}
                <CoinSymbolComponent contractAddress={payment.data.attributes.contractAddress} />
              </span>
            </div>
          )}
          {!!book.payment.data.attributes?.cleaningServiceFee && (
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span>Cleaning Fee</span>
              <span>
                {book.payment.data.attributes.cleaningServiceFee}{" "}
                <CoinSymbolComponent contractAddress={payment.data.attributes.contractAddress} />
              </span>
            </div>
          )}

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{book.payment.data.attributes.bookTotalAmount}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 sm:mb-16 sm:mt-10 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">Contact Information</h2>
        <span className="mt-1.5 text-lg text-neutral-400">
          The Host will contact you soon through your contact information.<br></br> Don’t worry if
          the Host has some delay, your funds are blocked until check-in.
        </span>
        <CheckOutEmailForm
          email={email}
          phoneNumber={phoneNumber}
          onFormStateChange={onFormStateChangeHandler}
        />

        <h2 className="text-3xl lg:text-4xl font-semibold">Confirm and payment</h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Your trip dates</h3>
            <div className="flex flex-col mt-1.5">
              <span className="mt-1.5 text-lg text-neutral-400">
                {convertSelectedDateToString(book.from, book.to)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Deposit Address</h3>
            <div className="my-5">
              <span className="text-lg text-neutral-400  break-words sm:break-words w-full sm:w-1/3">
                {book.payment.data.attributes.depositAddress}
              </span>
            </div>
          </div>

          <div className="">
            <div className="pt-1">
              <SentTransactionComponent
                disabled={!isValidEmail}
                paymentId={payment.data.id}
                txHash={hashTx}
                token={payment.data.attributes.contractAddress as Address}
                ABI={payment.data.attributes.contractABI}
                amount={payment.data.attributes.amount}
                receiptAddress={payment.data.attributes.depositAddress as Address}
                onTxSent={onTxSentHandler}
                onTxError={onTxErrorHandler}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="md:container px-4 mt-11 sm:mt-2 mb-24 sm:mb-3 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;

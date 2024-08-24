"use client";
import React, { FC, useCallback, useMemo, useState } from "react";
import Badge from "@/shared/Badge";
import Link from "next/link";
import { Book } from "@/interfaces/Booking";
import { TwMainColor } from "@/data/types";
import { PaymentStatus, PaymentStatusMessages } from "@/interfaces/Payment";
import CoinSymbolComponent from "../CoinSymbolComponent";
import { usePaymentMediation } from "@/hooks/usePayment";
import ConfirmDialog from "../ConfirmDialog/ComfirmDialog";
import { useRouter } from "next/navigation";
import HostInfo from "./HostInfo";
import BookDetails from "./BookDetails";
import Conditions from "./Conditions";
import { useAccount } from "wagmi";

export interface BookCardProps {
  className?: string;
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ className = "", book }) => {
  const router = useRouter();

  const { address } = useAccount();
  const [showDialogClaim, setShowClaimDialog] = useState(false);
  const stay = { ...book.stay.data.attributes, ...{ id: book.stay.data.id } };
  const payment = {
    ...book.payment.data.attributes,
    ...{ id: book.payment.data.id },
  };

  const [{ data, loading, error }, execute] = usePaymentMediation(payment.id);

  const guests = useMemo(
    () => book.guestAdults ?? 0 + book.guestChildren ?? 0 + book.guestInfants ?? 0,
    [book.guestAdults, book.guestChildren, book.guestInfants]
  );

  const statusColor = useMemo(() => {
    const bookStatusColorMap: Record<PaymentStatus, TwMainColor> = {
      [PaymentStatus.waitingForPayment]: "indigo",
      [PaymentStatus.success]: "green",
      [PaymentStatus.rejected]: "red",
      [PaymentStatus.inProcess]: "purple",
      [PaymentStatus.claimedByGuest]: "red",
      [PaymentStatus.claimedByHost]: "red",
    };

    return bookStatusColorMap[payment.status];
  }, [payment.status]);

  const handleOnConfirmClaim = useCallback(async () => {
    setShowClaimDialog(false);

    try {
      await execute({
        data: {
          data: {
            status:
              book.guestAddress === address
                ? PaymentStatus.claimedByGuest
                : PaymentStatus.claimedByHost,
          },
        },
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }, [book.guestAddress, execute, address, router]);

  const handleOnClaim = (event: any) => {
    event.preventDefault();

    setShowClaimDialog(true);
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col">
        <button
          className="absolute md:flex md:items-center md:justify-center right-3 top-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
          onClick={handleOnClaim}
        >
          <span className="ml-2 text-neutral-800 text-sm font-medium">Claim</span>
        </button>
        <HostInfo
          name={stay.name}
          address={book.host.data.attributes.username}
          email={book.host.data.attributes.email}
          isReady={payment.status === PaymentStatus.success}
        />
        <BookDetails nights={book.nights} from={book.from} to={book.to} guests={guests} />
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        <Conditions
          releaseHostTime={payment.releaseHostTime}
          releaseDepositTime={payment.releaseDepositTime}
          releaseStatus={payment.releaseStatus}
          releaseDepositStatus={payment.releaseDepositStatus}
        />

        {error?.message && (
          <div className="text-red-700 pt-3 rounded relative" role="alert">
            Oops! There&#39;s a problem with your claim. Please try again!
          </div>
        )}
        <div className="w-100 border-b border-neutral-300 dark:border-neutral-300 my-6"></div>
        <div className="flex justify-between items-end">
          <Badge color={statusColor} name={PaymentStatusMessages[payment.status]} />
          <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
            Total: {payment.bookTotalAmount}
            <CoinSymbolComponent contractAddress={payment.contractAddress} />
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden transition-shadow ${className}`}
    >
      <Link href={`/checkout/${book.id}`} className="absolute` inset-0">
        <div className="grid md:grid-cols-1 sm:flex sm:flex-row ">{renderContent()}</div>
      </Link>

      <ConfirmDialog
        isShow={showDialogClaim}
        onConfirm={handleOnConfirmClaim}
        onCancel={() => {
          setShowClaimDialog(false);
        }}
        title="Reservation Mediation Process"
        description="Initiate a mediation between the host and the guest to review and resolve the case."
        body="Once you click on 'claim', your reservation will be temporarily paused until the case is resolved. Depending on the outcome, you may receive a full or partial refund for both your reservation and security deposit. Please note that the final decision will be based on the mediation's findings."
      />
    </div>
  );
};

export default BookCard;

import React, { useState, FC } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ModalReservationMobile from "./ModalReservationMobile";
import { Stay } from "@/data/types";
import { GuestsObject } from "@/interfaces/guest.interface";
import ModalSelectDate from "./ModalSelectDate";
import { useAuth } from "@/contexts/AuthContext";

interface ReservationMobileComponentProps {
  stay: Stay;
  nights: number;
  excludeDates?: string[];
  minDate?: string;
  maxDate?: string;
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  loading?: boolean;
  isSameOrigin?: boolean;
  onChangeDate?: (value: {
    from?: Date | null;
    to?: Date | null;
    nights: number;
  }) => void;
  onReserve?: (event: any) => void;
  onChangeGuest?: (value: GuestsObject) => void;
}

const ReservationMobileComponent: FC<ReservationMobileComponentProps> = (
  props
) => {
  const {
    stay,
    nights,
    startDate,
    endDate,
    loading,
    isSameOrigin,
    onChangeGuest,
  } = props;
  const [showModal, setShowModal] = useState(false);
  const { isAuth } = useAuth();

  const { onReserve } = props;

  if (!isAuth) {
    return (
      <div className="fixed lg:hidden bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
        <div className="px-4 flex items-center justify-between">
          <div className="md:p-2">
            <div className="flex flex-col rounded-3xl pt-2 pb-2">
              <h3 className="flex-grow text-center text-sm font-medium text-pink-500 dark:text-neutral-300 sm:text-sm">
                {`To proceed with your booking, kindly connect your wallet.`}
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSameOrigin) {
    return (
      <div className="fixed lg:hidden bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
        <div className="px-4 flex items-center justify-between">
          <div className="md:p-2">
            <div className="flex flex-col rounded-3xl pt-2 pb-2">
              <h3 className="flex-grow text-center text-sm font-medium text-red-700 dark:text-neutral-300 sm:text-sm">
                {`It seems you're trying to book your own place. Please check your connected wallet.`}
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed lg:hidden bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
      <div className="px-4 flex items-center justify-between">
        <div className="md:p-2">
          <span className="block text-xl font-semibold">
            {stay.price}
            <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
              /night
            </span>
          </span>

          <ModalSelectDate
            show={showModal}
            onClose={() => {
              setShowModal(false);
            }}
            onShow={() => {
              setShowModal(true);
            }}
            {...props}
          />
        </div>
        <ModalReservationMobile
          startDate={startDate}
          endDate={endDate}
          nights={nights}
          stay={stay}
          loading={loading}
          renderChildren={({ openModal }) => (
            <ButtonPrimary
              disabled={!startDate || !endDate}
              type="button"
              onClick={openModal}
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
            >
              Review & Confirm
            </ButtonPrimary>
          )}
          onChangeGuest={onChangeGuest}
          onReserve={onReserve}
        />
      </div>
    </div>
  );
};

export default ReservationMobileComponent;

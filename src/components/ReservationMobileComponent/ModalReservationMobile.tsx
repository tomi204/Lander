import React, { FC, Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Stay } from "@/data/types";
import ReservationPrice from "@/components/ReservationComponent/ReservationPrice";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ReservationDateInfo from "./ReservationDateInfo";
import { GuestsObject } from "@/interfaces/guest.interface";
import GuestsInputMobile from "./GuestsInputMobile";

interface ModalReservationMobileProps {
  stay: Stay;
  nights: number;
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  loading?: boolean;
  renderChildren?: (p: { openModal: (event: any) => void }) => React.ReactNode;
  onChangeGuest?: (value: GuestsObject) => void;
  onReserve?: (event: any) => void;
}

const ModalReservationMobile: FC<ModalReservationMobileProps> = ({
  stay,
  nights,
  startDate,
  endDate,
  loading,
  renderChildren,
  onChangeGuest,
  onReserve,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 0,
    guestChildren: 0,
    guestInfants: 0,
  });

  //
  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  const renderButtonOpenModal = () => {
    return renderChildren ? (
      renderChildren({ openModal })
    ) : (
      <button onClick={openModal}>Select Date</button>
    );
  };

  const onChangeGuestHandler = (value: GuestsObject) => {
    setGuests(value);
    onChangeGuest && onChangeGuest(value);
  };

  const noGuest = useMemo(() => {
    return guests.guestAdults + guests.guestChildren + guests.guestInfants <= 0;
  }, [guests]);

  return (
    <>
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-50"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-50 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full flex-1 flex flex-col justify-between overflow-auto">
                  <div>
                    <div className="fixed inset-0 h-12 w-full z-20 bg-neutral-200 dark:bg-neutral-900">
                      <button
                        className="focus:outline-none focus:ring-0 h-12 w-12 p-2 text-center"
                        onClick={closeModal}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>

                    <div className="p-6 pt-16">
                      <div className="mb-5">
                        <span className="block font-semibold text-xl text-left sm:text-2xl">
                          {` Check and confirm`}
                        </span>
                      </div>
                      <ReservationPrice
                        price={stay.price}
                        nights={nights}
                        depositAmount={stay.depositAmount}
                        cleaningServiceFee={stay.cleaningServiceFee}
                      />

                      <GuestsInputMobile
                        className="mt-8"
                        onChange={onChangeGuestHandler}
                      />
                    </div>
                  </div>

                  <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
                    <div className="container flex items-center justify-end p-4">
                      <ReservationDateInfo
                        startDate={startDate}
                        endDate={endDate}
                      />
                      <ButtonPrimary
                        type="button"
                        onClick={onReserve}
                        disabled={noGuest}
                        loading={loading}
                        sizeClass="px-7 py-3 !rounded-2xl"
                      >
                        Reserve
                      </ButtonPrimary>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalReservationMobile;

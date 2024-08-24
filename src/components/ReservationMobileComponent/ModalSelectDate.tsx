"use client";

import DatePicker from "react-datepicker";
import { Dialog, Transition } from "@headlessui/react";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment, useEffect, useMemo, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import DatePickerCustomHeaderTwoMonth from "../DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "../DatePickerCustomDay";
import { calculateDifferenceInNights } from "@/utils/date";
import ReservationDateInfo from "./ReservationDateInfo";

interface ModalSelectDateProps {
  show: boolean;
  excludeDates?: string[];
  minDate?: string;
  maxDate?: string;
  onChangeDate?: (value: {
    from?: Date | null;
    to?: Date | null;
    nights: number;
  }) => void;
  onShow?: () => void;
  onClose?: () => void;
}

const ModalSelectDate: FC<ModalSelectDateProps> = ({
  show,
  excludeDates = [],
  minDate,
  maxDate,
  onShow,
  onClose,
  onChangeDate,
}) => {
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const nights = useMemo(() => {
    if (!startDate || !endDate) {
      return 0;
    }

    return calculateDifferenceInNights(
      startDate.toISOString(),
      endDate.toISOString()
    );
  }, [startDate, endDate]);

  useEffect(() => {
    if (!onChangeDate) {
      return;
    }

    onChangeDate({ from: startDate, to: endDate, nights });
  }, [startDate, endDate, onChangeDate, nights]);

  const excludeDatesMemo = useMemo(() => {
    return excludeDates.map((date) => {
      const [year, month, day] = date.split("-").map(Number);
      return new Date(year, month - 1, day);
    });
  }, [excludeDates]);

  const minDateMemo = useMemo(() => {
    if (!minDate) return new Date();

    const [year, month, day] = minDate.split("-").map(Number);
    return new Date(year, month - 1, day);
  }, [minDate]);

  const maxDateMemo = useMemo(() => {
    if (!maxDate) return null;

    const [year, month, day] = maxDate.split("-").map(Number);
    return new Date(year, month - 1, day);
  }, [maxDate]);

  const openModalHandler = () => {
    onShow && onShow();
  };

  const closeModalHandler = () => {
    onClose && onClose();
  };

  return (
    <>
      <ReservationDateInfo
        startDate={startDate}
        endDate={endDate}
        onSelect={openModalHandler}
      />
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-50"
          onClose={closeModalHandler}
        >
          <div className="fixed inset-0">
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
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                  <>
                    <div className="fixed inset-0 h-12 z-20 bg-neutral-100 dark:bg-neutral-900">
                      <button
                        className="focus:outline-none focus:ring-0 h-12 w-12 p-2 text-center"
                        onClick={closeModalHandler}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>

                    <div className="flex-1 pt-12 p-1 flex flex-col overflow-auto">
                      <div className="flex-1 flex flex-col bg-white dark:bg-neutral-800">
                        <div className="flex-1 flex flex-col transition-opacity animate-[myblur_0.4s_ease-in-out] overflow-auto">
                          <div className="p-5 ">
                            <span className="block font-semibold text-xl text-center sm:text-2xl">
                              {` When's your trip?`}
                            </span>
                          </div>
                          <div className="flex-1 relative flex z-10">
                            <div className="reservationDatePickerRange overflow-hidden rounded-3xl w-full">
                              <DatePicker
                                minDate={minDateMemo}
                                selected={startDate}
                                onChange={onChange}
                                startDate={startDate}
                                endDate={endDate}
                                excludeDates={excludeDatesMemo}
                                maxDate={maxDateMemo}
                                selectsRange
                                monthsShown={2}
                                showPopperArrow={false}
                                inline
                                renderCustomHeader={(p) => (
                                  <DatePickerCustomHeaderTwoMonth {...p} />
                                )}
                                renderDayContents={(day, date) => (
                                  <DatePickerCustomDay
                                    dayOfMonth={day}
                                    date={date}
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                      <button
                        type="button"
                        className="underline font-semibold flex-shrink-0"
                        onClick={() => {
                          onChange([null, null]);
                        }}
                      >
                        Clear dates
                      </button>
                      <ButtonPrimary
                        disabled={nights === 0}
                        sizeClass="px-6 py-3 !rounded-xl"
                        onClick={() => {
                          closeModalHandler();
                        }}
                      >
                        Save
                      </ButtonPrimary>
                    </div>
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalSelectDate;

"use client";

import React, { Fragment, useState, FC, useEffect, useMemo } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePicker from "react-datepicker";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";
import { calculateDifferenceInNights } from "@/utils/date";
import { max } from "date-fns";

export interface StayDatesRangeInputProps {
  className?: string;
  excludeDates?: string[];
  minDate?: string;
  maxDate?: string;
  error: boolean;
  onChangeDate?: (value: {
    from?: Date | null;
    to?: Date | null;
    nights: number;
  }) => void;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "flex-1",
  excludeDates = [],
  minDate,
  maxDate,
  error = false,
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

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {startDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            }) || "Add dates"}
            {endDate
              ? " - " +
                endDate?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })
              : ""}
          </span>
          <span
            className={`block mt-1 text-sm text-neutral-400 leading-none font-light ${
              error && "text-red-500"
            }`}
          >
            {"Check in - Check out"}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`StayDatesRangeInput z-10 relative flex ${className}`}>
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex-1 flex relative p-3 items-center space-x-3 focus:outline-none ${
              open ? "shadow-lg" : ""
            }`}
          >
            {renderInput()}
            {startDate && open && (
              <ClearDataButton onClick={() => onChange([null, null])} />
            )}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-auto xl:-right-10 right-0 z-10 mt-3 top-full w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl">
              <div className="reservationDatePickerRange overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
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
                    <DatePickerCustomDay dayOfMonth={day} date={date} />
                  )}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default StayDatesRangeInput;

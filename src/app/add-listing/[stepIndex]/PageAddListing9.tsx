"use client";

import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import NcInputNumber from "@/components/NcInputNumber";
import React, { FC, use, useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { PageAddListingProps } from "./StepsContainer";
import { set } from "js-cookie";
import StayDatesRangeInput from "@/app/stay/detail/StayDatesRangeInput";
import DatesRangeInput from "@/app/stay/detail/DatesRangeInput";
import { Switch } from "@headlessui/react";
import { formatDateWithoutTime } from "@/utils/date";

const PageAddListing9: FC<PageAddListingProps> = ({ setValue }) => {
  const [excludeDates, setExcludeDates] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>();
  const [isDatesRanges, setIsDatesRanges] = useState<boolean>(false);

  useEffect(() => {
    setValue("excludeDates", excludeDates);
  }, [excludeDates, setValue]);

  useEffect(() => {
    if (!startDate) return;

    setValue("availableFrom", startDate);
  }, [setValue, startDate]);

  useEffect(() => {
    if (!endDate) return;

    setValue("availableTo", endDate);
  }, [endDate, setValue]);

  useEffect(() => {
    if (!isDatesRanges) {
      setStartDate(new Date());
      setEndDate(null);
    }
  }, [isDatesRanges]);

  const OnChangeInputHandler = (
    name: "nightStayMin" | "nightStayMax",
    value: number
  ) => {
    setValue(name, value);
  };

  const onClickExcludeDates = (date?: Date) => {
    if (!date) return;

    const dateString = formatDateWithoutTime(date);

    if (excludeDates.includes(dateString)) {
      const dates = excludeDates.filter((date) => date !== dateString);

      setExcludeDates(dates);
      return;
    }

    setExcludeDates([...excludeDates, dateString]);
  };

  const onChangeAvialableRange = (value: {
    from?: Date | null;
    to?: Date | null;
    nights: number;
  }) => {
    if (!value?.from || !value?.to) {
      return;
    }

    setStartDate(value.from);
    setEndDate(value.to);
  };

  const excludeDatesMemo = useMemo(() => {
    return excludeDates.map((date) => {
      const [year, month, day] = date.split("-").map(Number);
      return new Date(year, month - 1, day);
    });
  }, [excludeDates]);

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">How long can guests stay?</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {` Shorter trips can mean more reservations, but you'll turn over your
          space more often.`}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-7 mt-6 mb-6">
        {/* ITEM */}
        <NcInputNumber
          label="Nights min"
          defaultValue={1}
          onChange={(value) => OnChangeInputHandler("nightStayMin", value)}
        />
        <NcInputNumber
          label="Nights max"
          defaultValue={30}
          onChange={(value) => OnChangeInputHandler("nightStayMax", value)}
        />
      </div>

      {/*  */}
      <div className="pt-6">
        <h2 className="text-2xl font-semibold">
          Stay Availability Range
          <span className="ml-4">
            <Switch
              checked={isDatesRanges}
              onChange={() => setIsDatesRanges(!isDatesRanges)}
              className={`${
                !isDatesRanges ? "bg-primary-300" : "bg-primary-500"
              }
          relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-full border-4 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Enable Stay Availability Range</span>
              <span
                aria-hidden="true"
                className={`${isDatesRanges ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </span>
        </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Select the start date (from) and the end date (to) to indicate when
          the stay is available. If no range is selected, the property will be
          considered available at all times.
        </span>
      </div>

      {isDatesRanges && (
        <div className="addListingDatePickerRange pt-10 pb-4">
          <DatesRangeInput
            className="flex-1 z-[11]"
            onChangeDate={onChangeAvialableRange}
          />
        </div>
      )}

      <div className="mt-10 mb-10">
        <h2 className="text-2xl font-semibold">Exclude Specific Stay Dates</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Based on the chosen availability range, select any dates you want to
          exclude from the stay&#39;s availability. If no dates are chosen, no
          exclusions will be made.
        </span>
      </div>

      <div className="addListingDatePickerExclude">
        <DatePicker
          onChange={(date) => {
            if (!date) return;
          }}
          minDate={startDate}
          maxDate={endDate}
          monthsShown={2}
          showPopperArrow={false}
          excludeDates={excludeDatesMemo}
          inline
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
          renderDayContents={(day, date) => (
            <DatePickerCustomDay
              dayOfMonth={day}
              date={date}
              onClick={onClickExcludeDates}
            />
          )}
        />
      </div>
    </>
  );
};

export default PageAddListing9;

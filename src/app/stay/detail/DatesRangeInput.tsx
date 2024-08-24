"use client";

import React, { useState, FC, useEffect, useMemo } from "react";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePicker from "react-datepicker";
import { calculateDifferenceInNights } from "@/utils/date";

export interface DatesRangeInputProps {
  className?: string;
  onChangeDate?: (value: {
    from?: Date | null;
    to?: Date | null;
    nights: number;
  }) => void;
}

const DatesRangeInput: FC<DatesRangeInputProps> = ({
  className = "flex-1",
  onChangeDate,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>();

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    onChangeDate && onChangeDate({ from: startDate, to: endDate, nights });
  }, [startDate, endDate, onChangeDate]);

  const nights = useMemo(() => {
    if (!startDate || !endDate) {
      return 0;
    }

    return calculateDifferenceInNights(
      startDate.toISOString(),
      endDate.toISOString()
    );
  }, [startDate, endDate]);

  return (
    <div className="addListingDatePickerExclude">
      <DatePicker
        minDate={new Date()}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        monthsShown={2}
        showPopperArrow={false}
        inline
        renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
        renderDayContents={(day, date) => (
          <DatePickerCustomDay dayOfMonth={day} date={date} />
        )}
      />
    </div>
  );
};

export default DatesRangeInput;

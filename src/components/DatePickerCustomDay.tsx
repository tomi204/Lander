import React, { FC } from "react";

interface Props {
  dayOfMonth: number;
  date?: Date | undefined;
  onClick?: (date?: Date) => void;
}

const DatePickerCustomDay: FC<Props> = ({ dayOfMonth, date, onClick }) => {
  return (
    <button
      onClick={(event: any) => {
        event.preventDefault();
        onClick && onClick(date);
      }}
    >
      <span className="react-datepicker__day_span">{dayOfMonth}</span>
    </button>
  );
};

export default DatePickerCustomDay;

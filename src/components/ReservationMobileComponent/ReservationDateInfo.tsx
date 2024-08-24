import CalendarIcon from "@heroicons/react/24/solid/CalendarIcon";
import React from "react";
import { FC } from "react";

interface ReservationDateInfoProps {
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  onSelect?: (event?: any) => void;
}

const ReservationDateInfo: FC<ReservationDateInfoProps> = ({
  startDate,
  endDate,
  onSelect,
}) => (
  <div className="flex-grow text-left" onClick={onSelect}>
    <span className="block text-m font-semibold">
      {startDate?.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      }) ||
        (onSelect && (
          <button
            onClick={onSelect}
            className="flex items-center gap-2 text-purple-600 text-sm"
          >
            Select Date
            <span>
              <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
            </span>
          </button>
        ))}
      {endDate
        ? " - " +
          endDate?.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          })
        : ""}
    </span>
  </div>
);

export default ReservationDateInfo;

import convertSelectedDateToString from "@/utils/converSelectedDateToString";
import { FC } from "react";

interface BookDetailsProps {
  nights: number;
  guests: number;
  from: string;
  to: string;
}

const BookDetails: FC<BookDetailsProps> = ({ nights = 0, guests = 0, from, to }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-moon text-lg text-purple-500"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">{nights} nights</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-user text-lg text-blue-500"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">{guests} guests</span>
          </div>
        </div>
      </div>

      {from && (
        <div className="flex justify-between items-end">
          <span className="text-sm text-neutral-500">
            <i className="las la-calendar text-lg text-purple-500 mr-3"></i>
            {convertSelectedDateToString(from, to)}
          </span>
        </div>
      )}
    </>
  );
};

export default BookDetails;

"use client";

import React, { useState } from "react";
import NcInputNumber from "@/components/NcInputNumber";
import { FC } from "react";
import { PathName } from "@/routers/types";
import { GuestsObject } from "@/interfaces/guest.interface";

export interface GuestsInputMobileProps {
  fieldClassName?: string;
  className?: string;
  buttonSubmitHref?: PathName;
  hasButtonSubmit?: boolean;
  onChange?: (value: GuestsObject) => void;
}

const GuestsInputMobile: FC<GuestsInputMobileProps> = ({
  onChange,
  className = "[ nc-flex-1 ]",
}) => {
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(0);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(0);

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      guestAdults: guestAdultsInputValue ?? 0,
      guestChildren: guestChildrenInputValue ?? 0,
      guestInfants: guestInfantsInputValue ?? 0,
    };
    if (type === "guestAdults") {
      setGuestAdultsInputValue(value);
      newValue.guestAdults = value;
    }
    if (type === "guestChildren") {
      setGuestChildrenInputValue(value);
      newValue.guestChildren = value;
    }
    if (type === "guestInfants") {
      setGuestInfantsInputValue(value);
      newValue.guestInfants = value;
    }

    onChange && onChange(newValue);
  };

  return (
    <div className={`flex relative ${className}`}>
      <div className={`flex-1 z-10 flex items-center focus:outline-none`}>
        <div className="absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full py-6 px-8 rounded-3xl shadow-xl">
          <NcInputNumber
            className="w-full"
            defaultValue={guestAdultsInputValue}
            onChange={(value) => handleChangeData(value, "guestAdults")}
            max={10}
            min={1}
            label="Adults"
            desc="Ages 13 or above"
          />
          <NcInputNumber
            className="w-full mt-6"
            defaultValue={guestChildrenInputValue}
            onChange={(value) => handleChangeData(value, "guestChildren")}
            max={4}
            label="Children"
            desc="Ages 2–12"
          />

          <NcInputNumber
            className="w-full mt-6"
            defaultValue={guestInfantsInputValue}
            onChange={(value) => handleChangeData(value, "guestInfants")}
            max={4}
            label="Infants"
            desc="Ages 0–2"
          />
        </div>
      </div>
    </div>
  );
};

export default GuestsInputMobile;

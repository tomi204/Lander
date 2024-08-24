import React, { FC, useEffect, useState } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../../../../components/ReservationComponent/GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { GuestsObject } from "../../../../interfaces/guest.interface";
import { useRouter } from "next/navigation";

const StaySearchForm: FC<{
  hasButtonSubmit?: boolean;
  onChangeHandler?: (location: string, guest: number) => void;
}> = ({ hasButtonSubmit = true, onChangeHandler }) => {
  const [location, setLocation] = useState("");
  const [guest, setGuests] = useState(0);
  const router = useRouter();

  useEffect(() => {
    onChangeHandler && onChangeHandler(location, guest);
  }, [location, guest, onChangeHandler]);

  const onChangeGuestsHandler = (guests: GuestsObject) => {
    setGuests(guests.guestAdults + guests.guestChildren + guests.guestInfants);
  };

  const onChangeLocationHandler = (location: string) => {
    setLocation(location);
  };

  const onSelectHandler = (location: string) => {
    setLocation(location);
    onChangeHandler && onChangeHandler(location, guest);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    router.replace(`/?location=${location}&guest=${guest}`);
  };

  const renderForm = () => {
    return (
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:h-full relative mt-8 flex md:rounded-full md:shadow-xl md:dark:shadow-2xl bg-white dark:bg-neutral-800 sm:flex-col"
      >
        <LocationInput className="" onChange={onChangeLocationHandler} onSelect={onSelectHandler} />
        {/* <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <StayDatesRangeInput className="flex-1" /> */}
        <div className="self-center sm:hidden border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <GuestsInput
          className="md:flex-1"
          onChange={onChangeGuestsHandler}
          hasButtonSubmit={hasButtonSubmit}
          buttonSubmitHref={`/?location=${location}&guest=${guest}`}
        />
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;

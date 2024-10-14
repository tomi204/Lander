import React, { FC, useEffect, useState } from 'react';
import LocationInput from '../LocationInput';
import GuestsInput from '../../../../components/ReservationComponent/GuestsInput';
import { GuestsObject } from '../../../../interfaces/guest.interface';
import { useRouter } from 'next/navigation';

const StaySearchForm: FC<{
  hasButtonSubmit?: boolean;
  onChangeHandler?: (location: string, guest: number) => void;
}> = ({ hasButtonSubmit = true, onChangeHandler }) => {
  const [location, setLocation] = useState('');
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

  const onSubmitHandler = (e: any) => {
    e.preventDefault();

    const params = new URLSearchParams({
      location,
      guest: guest.toString(),
    }).toString();

    router.push(`/search?${params}`);
  };

  const renderForm = () => {
    return (
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:h-full relative mt-8 flex md:rounded-full md:shadow-xl md:dark:shadow-2xl bg-white dark:bg-neutral-800 sm:flex-col p-2"
      >
        <LocationInput className="" onChange={onChangeLocationHandler} />
        <div className="self-center sm:hidden border-r border-slate-200 dark:border-slate-700 h-8 p-4"></div>
        <GuestsInput className="md:flex-1" onChange={onChangeGuestsHandler} />
        <button
          type="submit"
          className="self-center h-14 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none"
        >
          <span className="mr-3 md:hidden">search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;

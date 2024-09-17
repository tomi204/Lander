import GuestsInput from '@/components/ReservationComponent/GuestsInput';
import StayDatesRangeInput from '@/app/stay/detail/StayDatesRangeInput';
import { Stay } from '@/data/types';
import ButtonPrimary from '@/shared/ButtonPrimary';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { GuestsObject } from '@/interfaces/guest.interface';
import { useForm } from 'react-hook-form';
import { BookingPayload } from '@/interfaces/Booking';
import { useCreateBooking } from '@/hooks/useBooking';
import { formatDateWithoutTime } from '@/utils/date';
import ReservationPrice from './ReservationPrice';
import ReservationMobileComponent from '../ReservationMobileComponent/ReservationMobileComponent';
import { useAccount } from 'wagmi';
import supabase from '@/supabase/client';
import { DatabaseBackup, TicketX } from 'lucide-react';
import { useTransaction } from '@/contexts/CheckoutProvider';
import { useRouter } from 'next/navigation';
interface ReservationComponentProps {
  stay: any;
}

const ReservationComponent: any = ({ stay }: ReservationComponentProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<BookingPayload>();
  const { setTransaction } = useTransaction() || {};

  const router = useRouter();

  const [nights, setNights] = useState<number>(0);
  const submitBtnReference = useRef<HTMLButtonElement>(null);
  const { isAuth, isAuthenticating } = useAuth();
  const [{ loading, error }] = useCreateBooking();
  const { address } = useAccount();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const price = stay?.price;
  const depositAmount = stay?.depositAmount;
  const cleaningServiceFee = stay?.cleaningServiceFee;

  const totalPrice = Number(
    price * nights + (cleaningServiceFee ?? 0) + (depositAmount ?? 0)
  );
console.log(stay, 'stay');


  const handleCheckout = async () => {
    
    const transaction = {
      main_image:stay.main_image ,
      amount: totalPrice,
      entrance_date: startDate ? startDate.toISOString() : undefined,
      departure_date: endDate ? endDate.toISOString() : undefined,
      buyer_wallet: address,
      property_id: stay.id,
      nights: nights,
      owner_wallet: stay.owner.wallet,
      owner_id: stay.owner.id,
    };

    console.log(transaction, 'transaction');
    
    try {
      const response = await fetch('/api/createTx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error(`Error creating transaction: ${response.statusText}`);
      }

      const tx = await response.json();
      console.log(tx, 'tx');
      let id = tx?.data[0]?.id;
      if (id) {

        setTransaction?.(tx?.data[0]);
      }
      router.push('/checkout');
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const onChangeDate = ({
    from,
    to,
    nights,
  }: {
    from?: Date | null;
    to?: Date | null;
    nights: number;
  }) => {
    if (!from || !to) {
      return;
    }

    setNights(nights);
    setValue('from', formatDateWithoutTime(from));
    setValue('to', formatDateWithoutTime(to));
    setStartDate(from);
    setEndDate(to);
  };

  const isSameOrigin = useMemo(
    () => address === stay.owner.name,
    [address, stay.owner.name]
  );

  const disabled = useMemo(
    () => isAuthenticating || isSameOrigin || !isAuth,
    [isAuthenticating, isSameOrigin, isAuth]
  );

  const excludeDates = useMemo(() => {
    const excludeDates = stay?.excludeDates ?? [];
    const reservedDates = stay?.reservedDates ?? [];

    return [...excludeDates, ...reservedDates];
  }, [stay?.excludeDates, stay?.reservedDates]);

  useEffect(() => {
    register('stay', {
      value: stay.id,
      required: { value: true, message: 'The stay ID is required' },
    });
    register('host', {
      value: stay.owner.id,
      required: { value: true, message: 'The host ID is required' },
    });
    register('guestAddress', {
      value: stay?.location,
      required: { value: true, message: 'Wallet not connected' },
    });
    register('guestAdults', {
      required: {
        value: true,
        message: 'The number of adult guests is required',
      },
    });
    register('guestChildren');
    register('guestInfants');
    register('from', {
      required: { value: true, message: 'The starting date is required' },
    });
    register('to', {
      required: { value: true, message: 'The ending date is required' },
    });
  }, [address, register, stay.owner.name, stay.id]);

  const onChangeGuests = (guests: GuestsObject) => {
    setValue('guestAdults', guests.guestAdults);
    setValue('guestChildren', guests.guestChildren);
    setValue('guestInfants', guests.guestInfants);
  };

  const errorMessage = useMemo(() => {
    if (!isAuth) {
      return 'Please connect to wallet first.';
    }

    if (error?.status === 409) {
      return 'Your selected dates are not available.';
    }

    if (error?.status === 405) {
      return 'You need connect to wallet first.';
    }

    if (error) {
      return 'Ops! Something went wrong. Try again later.';
    }
  }, [error, isAuth]);

  const dateRangeError = useMemo(() => {
    return errors.from || errors.to;
  }, [errors.from, errors.to]);

  const guestsError = useMemo(() => {
    return errors.guestAdults || errors.guestChildren || errors.guestInfants;
  }, [errors.guestAdults, errors.guestChildren, errors.guestInfants]);

  return (
    <>
      <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
        <div className="sticky top-28">
          <div className="listingSectionSidebar__wrap shadow-xl ">
            {/* <ReservationPrice
              price={stay?.price}
              nights={nights}
              depositAmount={stay.depositAmount}
              cleaningServiceFee={stay.cleaningServiceFee}
            /> */}

            <div className="flex flex-col space-y-6 lg:space-y-7">
              <div className="flex justify-between">
                <span className="text-3xl font-semibold">
                  $ {price}
                  <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                    /night
                  </span>
                </span>
                {/* <StartRating /> */}
              </div>

              <div className="flex justify-between">
                <span className="text-3s font-semibold">
                  Nights:
                  <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                    {nights}
                  </span>
                </span>
              </div>

              {!!depositAmount && (
                <div className="flex justify-between">
                  <span className="text-3s font-semibold">
                    Deposit Guaranty:
                    <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                      USDT {depositAmount}
                    </span>
                  </span>
                </div>
              )}

              {!!cleaningServiceFee && (
                <div className="flex justify-between">
                  <span className="text-3s font-semibold">
                    Cleaning Service:
                    <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                      USDT {cleaningServiceFee}
                    </span>
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-3s font-semibold">
                  Total:
                  <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                    USDT {totalPrice}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
              <StayDatesRangeInput
                error={!!dateRangeError}
                minDate={stay.availableFrom}
                maxDate={stay.availableTo}
                excludeDates={excludeDates}
                className="flex-1 z-[11]"
                onChangeDate={onChangeDate}
              />
              <GuestsInput onChange={onChangeGuests} error={!!guestsError} />
            </div>
            <div className="flex flex-col rounded-3xl pt-2 pb-2">
              <ButtonPrimary
                disabled={disabled}
                loading={loading}
                onClick={handleCheckout}
              >
                Reserve
              </ButtonPrimary>
            </div>

            {/* {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                  <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    <div className="mt-3 text-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Choose Payment Network</h3>
                      <div className="mt-2 px-7 py-3">
                        <button onClick={() => handlePaymentChoice( 'polygon' )} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full mb-2 w-full">Polygon</button>
                        <button onClick={() => handlePaymentChoice( 'arbitrum' )} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2 w-full">Arbitrum</button>
                        <button onClick={() => handlePaymentChoice( 'avalanche' )} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mb-2 w-full">Avalanche</button>
                        <button onClick={() => setIsModalOpen( false )} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full w-full">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}

            {errorMessage && (
              <div className="flex flex-col rounded-3xl pt-2 pb-2">
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {errorMessage}
                </h3>
              </div>
            )}
            {isSameOrigin && (
              <div className="flex flex-col rounded-3xl pt-2 pb-2">
                <h3 className="flex-grow text-center text-sm font-medium text-red-700 dark:text-neutral-300 sm:text-sm">
                  The host address is the same as the guest&apos;s. Please check
                  your connected address.
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
      <ReservationMobileComponent
        isSameOrigin={isSameOrigin}
        loading={loading}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
        stay={stay}
        minDate={stay.availableFrom}
        maxDate={stay.availableTo}
        excludeDates={excludeDates}
        onChangeDate={onChangeDate}
        onReserve={(event: any) => {
          event.preventDefault();
          submitBtnReference.current?.click();
        }}
        onChangeGuest={onChangeGuests}
      />
    </>
  );
};

export default ReservationComponent;

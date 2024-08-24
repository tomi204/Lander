import GuestsInput from "@/components/ReservationComponent/GuestsInput";
import StayDatesRangeInput from "@/app/stay/detail/StayDatesRangeInput";
import { Stay } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { GuestsObject } from "@/interfaces/guest.interface";
import { useForm } from "react-hook-form";
import { BookingPayload } from "@/interfaces/Booking";
import { useCreateBooking } from "@/hooks/useBooking";
import { formatDateWithoutTime } from "@/utils/date";
import ReservationPrice from "./ReservationPrice";
import ReservationMobileComponent from "../ReservationMobileComponent/ReservationMobileComponent";
import { useAccount } from "wagmi";
interface ReservationComponentProps {
  stay: Stay;
}

const ReservationComponent: FC<ReservationComponentProps> = ({ stay }) => {
  const submitBtnReference = useRef<HTMLButtonElement>(null);
  const { isAuth, isAuthenticating } = useAuth();
  const [{ data, loading, error }, executeBookingPost] = useCreateBooking();

  const { address } = useAccount();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingPayload>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const isSameOrigin = useMemo(
    () => address === stay.author.data.attributes.username,
    [address, stay.author.data.attributes.username]
  );

  const disabled = useMemo(
    () => isAuthenticating || isSameOrigin || !isAuth,
    [isAuthenticating, isSameOrigin, isAuth]
  );

  const [nights, setNights] = useState<number>(0);

  const excludeDates = useMemo(() => {
    const excludeDates = stay?.excludeDates ?? [];
    const reservedDates = stay?.reservedDates ?? [];

    return [...excludeDates, ...reservedDates];
  }, [stay?.excludeDates, stay?.reservedDates]);

  useEffect(() => {
    register("stay", {
      value: stay.id,
      required: { value: true, message: "The stay ID is required" },
    });
    register("host", {
      value: stay.author.data.id,
      required: { value: true, message: "The host ID is required" },
    });
    register("guestAddress", {
      value: address,
      required: { value: true, message: "Wallet not connected" },
    });
    register("guestAdults", {
      required: {
        value: true,
        message: "The number of adult guests is required",
      },
    });
    register("guestChildren");
    register("guestInfants");
    register("from", {
      required: { value: true, message: "The starting date is required" },
    });
    register("to", {
      required: { value: true, message: "The ending date is required" },
    });
  }, [address, register, stay.author, stay.id]);

  const onSubmit = (data: BookingPayload) => {
    executeBookingPost({ data });
  };

  useEffect(() => {
    if (data?.data.id) {
      router.push(`/checkout/${data?.data.id}`);
    }
  }, [data, router]);

  // Handlers
  const onChangeGuests = (guests: GuestsObject) => {
    setValue("guestAdults", guests.guestAdults);
    setValue("guestChildren", guests.guestChildren);
    setValue("guestInfants", guests.guestInfants);
  };

  const errorMessage = useMemo(() => {
    if (!isAuth) {
      return "Please connect to wallet first.";
    }

    if (error?.status === 409) {
      return "Your selected dates are not available.";
    }

    if (error?.status === 405) {
      return "You need connect to wallet first.";
    }

    if (error) {
      return "Ops! Something went wrong. Try again later.";
    }
  }, [error, isAuth]);

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
    setValue("from", formatDateWithoutTime(from));
    setValue("to", formatDateWithoutTime(to));
    setStartDate(from);
    setEndDate(to);
  };

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
            <ReservationPrice
              price={stay.price}
              nights={nights}
              depositAmount={stay.depositAmount}
              cleaningServiceFee={stay.cleaningServiceFee}
            />
            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  type="submit"
                  loading={loading}
                  ref={submitBtnReference}
                >
                  Reserve
                </ButtonPrimary>
              </div>
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
                    The host address is the same as the guest&apos;s. Please check your connected
                    address.
                  </h3>
                </div>
              )}
            </form>
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

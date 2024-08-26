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
import supabase from "@/supabase/client";
import { DatabaseBackup, TicketX } from "lucide-react";


interface ReservationPriceProps {
  price: number;
  depositAmount?: number;
  cleaningServiceFee?: number;
  nights: number;
}


interface ReservationComponentProps {
  stay: any;
}



//client - propietario- propiedad 
// endpoint the verificacion de usuario que va a recibir un true o false para sobreescribir la columna de worldID 
// la tabla transaction  va a tener un tx id por chain , ese id se guarda en el backen para consultar el estado de una transaccion vinculada al usuario que lo generó , buyer , owner, y property , codigo de confirmación es el id de transaccion en p2p 
// con ese id de transaccion renderizo el p2p ,  post con espacio para cada chain 




interface Transaction {
  id: string;
  book_id: string;
  amount: number;
  entrance_date: string;
  departure_date: string;
  buyer_wallet: string;
  owner_id: string;
  property_id: string;
  payment_network: 'polygon' | 'arbitrum' | 'avalanche';
  status: 'pending' | 'completed' | 'failed';
}




const ReservationComponent: any = ( { stay }: ReservationComponentProps ) => {

  const router = useRouter();
  const [nights, setNights] = useState<number>( 0 );
  const submitBtnReference = useRef<HTMLButtonElement>( null );
  const { isAuth, isAuthenticating } = useAuth();
  const [{ data, loading, error }, executeBookingPost] = useCreateBooking();
  const { address } = useAccount();
  const [transactions, setTransactions] = useState<Transaction>( {} as Transaction );
  const [startDate, setStartDate] = useState<Date | null>( null );
  const [endDate, setEndDate] = useState<Date | null>( null );

  const price = stay?.price;
  const depositAmount = stay?.depositAmount;
  const cleaningServiceFee = stay?.cleaningServiceFee;
  const totalPrice = Number(
    price * nights + ( cleaningServiceFee ?? 0 ) + ( depositAmount ?? 0 )
  );

  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>();

  const [isModalOpen, setIsModalOpen] = useState( false );
  const [selectedNetwork, setSelectedNetwork] = useState<'polygon' | 'arbitrum' | 'avalanche' | null>( null );

  // useEffect( () => {
  //   fetchTransactions();
  // }, [] );

  // const fetchTransactions = async () => {
  //   const { data, error } = await supabase
  //     .from( 'transactions' )
  //     .select( `
  //     *,
  //     owner:owner_id (
  //       id,
  //       name,
  //       email
  //     )
  //     property:property_id (

  //       *    

  //     )  
  //   ` );
  //   console.log( data );
  //   if ( error ) {
  //     console.error( 'Error fetching transactions:', error );
  //   } else {
  //     setTransactions( data);
  //   }
  // };

  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target;
    if ( name === 'amount' ) {
      // Ensure amount is a valid decimal with up to 8 decimal places
      const regex = /^\d*\.?\d{0,8}$/;
      if ( regex.test( value ) ) {
        setNewTransaction( { ...newTransaction, [name]: parseFloat( value ) } );
      }
    } else {
      setNewTransaction( { ...newTransaction, [name]: value } );
    }
  };

  const handleSub = async ( e: React.FormEvent ) => {
    e.preventDefault();
    setIsModalOpen( true );
  };

  const handlePayment = async () => {
    const transaction = {
      amount: totalPrice,
      entrance_date: startDate ? startDate.toISOString() : undefined,
      departure_date: endDate ? endDate.toISOString() : undefined,
      buyer_wallet: address,
      owner_id: stay.owner.id,
      property_id: stay.id,
      tx_id_polygon: "",
    };

    try {
      const response = await fetch( '/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( transaction ),
      } );

      if ( !response.ok ) {
        throw new Error( `Error creating transaction: ${response.statusText}` );
      }


      const tx = await response.json();

      console.log( tx );
      if ( tx?.id ) {
        router.push( `/checkout/${tx?.id}` );
      }

      // setTransactions( tx )
      //  router.push( `/checkout/${data?.id}` );



    } catch ( error ) {
      console.error( 'Error creating transaction:', error );
    }
  };

  const updateTransactionStatus = async ( txId: string, network: string ) => {
    // In a real-world scenario, you'd check the actual transaction status on the blockchain here
    const status = Math.random() > 0.5 ? 'completed' : 'failed';

    const { error } = await supabase
      .from( 'transactions' )
      .update( { status } )
      .eq( 'id', txId );

    if ( error ) console.error( 'Error updating transaction status:', error );
    else {
      console.log( `Transaction ${txId} status updated to ${status}` );
      // fetchTransactions();
    }
  };

  const handleDelete = async ( id: string ) => {
    const { error } = await supabase
      .from( 'transactions' )
      .delete()
      .eq( 'id', id );

    if ( error ) console.error( 'Error deleting transaction:', error );
    else {
      console.log( 'Transaction deleted' );
      // fetchTransactions();
    }
  };

  const onChangeDate = ( {
    from,
    to,
    nights,
  }: {
    from?: Date | null;
    to?: Date | null;
    nights: number;
  } ) => {
    if ( !from || !to ) {
      return;
    }

    setNights( nights );
    setValue( "from", formatDateWithoutTime( from ) );
    setValue( "to", formatDateWithoutTime( to ) );
    setStartDate( from );
    setEndDate( to );
  };


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingPayload>();


  const isSameOrigin = useMemo(
    () => address === stay.owner.name,
    [address, stay.owner.name]
  );

  const disabled = useMemo(
    () => isAuthenticating || isSameOrigin || !isAuth,
    [isAuthenticating, isSameOrigin, isAuth]
  );



  const excludeDates = useMemo( () => {
    const excludeDates = stay?.excludeDates ?? [];
    const reservedDates = stay?.reservedDates ?? [];

    return [...excludeDates, ...reservedDates];
  }, [stay?.excludeDates, stay?.reservedDates] );

  // useEffect( () => {
  //   register( "stay", {
  //     value: stay.id,
  //     required: { value: true, message: "The stay ID is required" },
  //   } );
  //   register( "host", {
  //     value: stay.owner.id,
  //     required: { value: true, message: "The host ID is required" },
  //   } );
  //   register( "guestAddress", {
  //     value: stay?.location,
  //     required: { value: true, message: "Wallet not connected" },
  //   } );
  //   register( "guestAdults", {
  //     required: {
  //       value: true,
  //       message: "The number of adult guests is required",
  //     },
  //   } );
  //   register( "guestChildren" );
  //   register( "guestInfants" );
  //   register( "from", {
  //     required: { value: true, message: "The starting date is required" },
  //   } );
  //   register( "to", {
  //     required: { value: true, message: "The ending date is required" },
  //   } );
  // }, [address, register, stay.owner.name, stay.id] );

  const onSubmit = ( data: any ) => {
    executeBookingPost( { data } );
  };

  // useEffect( () => {
  //   if ( transactions?.id ) {
  //     router.push( `/checkout/${transactions?.id}` );
  //   }
  // }, [ router, transactions] );


  // Handlers
  const onChangeGuests = ( guests: GuestsObject ) => {
    setValue( "guestAdults", guests.guestAdults );
    setValue( "guestChildren", guests.guestChildren );
    setValue( "guestInfants", guests.guestInfants );
  };

  const errorMessage = useMemo( () => {
    if ( !isAuth ) {
      return "Please connect to wallet first.";
    }

    if ( error?.status === 409 ) {
      return "Your selected dates are not available.";
    }

    if ( error?.status === 405 ) {
      return "You need connect to wallet first.";
    }

    if ( error ) {
      return "Ops! Something went wrong. Try again later.";
    }
  }, [error, isAuth] );



  const dateRangeError = useMemo( () => {
    return errors.from || errors.to;
  }, [errors.from, errors.to] );

  const guestsError = useMemo( () => {
    return errors.guestAdults || errors.guestChildren || errors.guestInfants;
  }, [errors.guestAdults, errors.guestChildren, errors.guestInfants] );



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
                    USDT{" "}
                    {totalPrice}
                  </span>
                </span>
                {/* <StartRating /> */}
              </div>
            </div>







            {/* FORM */}
            <form onSubmit={handlePayment}>
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
                  // ref={submitBtnReference}
                  onClick={handlePayment}


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
        onReserve={( event: any ) => {
          event.preventDefault();
          submitBtnReference.current?.click();
        }}
        onChangeGuest={onChangeGuests}
      />
    </>
  );
};

export default ReservationComponent;

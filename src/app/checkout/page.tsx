'use client';
import Image from 'next/image';
import { CreditCard } from 'lucide-react';
import React ,{useState, useEffect}from 'react';
import { useTransaction } from '@/contexts/CheckoutProvider';
import ContractInteraction from '@/components/P2pTransaction';
import { fetchRenterByTxAndWallet } from '@/services/account';
import { findPropertyById } from '@/services/listings';
import { useAccount } from 'wagmi';



export default function StayDetailPage() {
  const { transaction, setTransaction } = useTransaction() || {};
  const tx = transaction;
  console.log(transaction, 'transaction');
  const { address } = useAccount();
  const [propData, setPropData] = useState<any|null>( null );
  const [buyerData, setBuyerData] = useState<any | null>( null ); 
  console.log(buyerData, 'buyerData');



useEffect( () => {
      const fetchUserData = async () => {
        if ( transaction && address ) {
          try {
            const prop = await findPropertyById( tx.propety_id );          
            const user = await fetchRenterByTxAndWallet( address );
            setPropData( prop )
            setBuyerData( user );
          } catch ( error ) {
            console.error( 'Error fetching user data:', error );
          }
        }
      };

      fetchUserData();
    }, [transaction, address] );



  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="w-full lg:w-2/3 space-y-6">
          <button className="flex items-center text-blue-600 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Property Details
          </button>

          {/* <div className="space-y-4">
            <h2 className="text-2xl font-bold">Payment Method</h2>
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 flex items-center space-x-4">
                  <CreditCard className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-semibold">Pay with Polygon</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4 flex items-center space-x-4 bg-green-50 border-green-500">
                  <CreditCard className="h-8 w-8 text-orange-500" />
                  <div>
                    <p className="font-semibold">Pay with BSC</p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500 ml-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="border rounded-lg p-4 flex items-center space-x-4">
                  <CreditCard className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-semibold">Pay with Solana</p>
                  </div>
                </div>
              </div>
              <button className="text-blue-600 font-semibold flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Add New Payment
              </button>
            </div>
          </div> */}

          <ContractInteraction
            amount={tx?.amount}
            sellerAddress={tx?.owner_wallet}
          />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Cancellation policy</h2>
            <p>Cancellation before your check-in date</p>
            <p className="text-gray-600">
              After that, the reservation is non-refundable.{' '}
              <a href="#" className="text-blue-600 underline">
                Learn more
              </a>
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Ground rules</h2>
            <p className="text-gray-600">
              We ask every guest to remember a few simple things about what
              makes a great guest.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Follow the house rules</li>
              <li>Treat your Host's home like your own</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <p className="text-gray-600">
              The Host will contact you soon. Don’t worry if the Host has some
              delay, your funds are blocked on staking until check-in.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="border rounded-lg overflow-hidden">
            <Image
              src={tx?.attributes?.image || ''}
              alt={tx?.attributes?.title || ''}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <p className="font-semibold">{tx?.attributes || ''}</p>
              <p className="font-semibold">{tx?.attributes?.location || ''}</p>
              {/* <p className="text-sm text-gray-500">
                {stay?.num_rooms || ''} bedrooms • {stay?.num_bathrooms || ''}{' '}
                bathrooms{' '}
              </p> */}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Trip Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Check-In</p>
                <p className="font-semibold">{tx?.entrance_date}</p>
              </div>
              <div className="flex justify-between">
                <p>Check-Out</p>
                <p className="font-semibold">{tx?.departure_date}</p>
              </div>
              {/* <div className="flex justify-between">
                <p>Guests</p>
                <p className="font-semibold">04</p>
              </div> */}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Pricing Breakdown</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Nights</p>
                <p className="font-semibold">{tx?.nights}</p>
              </div>
              {/* <div className="flex justify-between">
                <p>Cleaning Fee</p>
                <p className="font-semibold">$10</p>
              </div>
              <div className="flex justify-between">
                <p>Lander Service Fee</p>
                <p className="font-semibold">$5</p>
              </div> */}
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>{tx?.amount}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Transaction Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Buyer </p>
                <p className="font-semibold">
                  { address}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Seller</p>
                <p className="font-semibold">
                  {tx?.owner_wallet}
                </p>
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
            Check-In
          </button>
        </div>
      </div>
    </div>
  );
}

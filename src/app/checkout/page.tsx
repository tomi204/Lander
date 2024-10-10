'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTransaction } from '@/contexts/CheckoutProvider';
import BuyButton from '@/components/P2pTransaction';
import { fetchRenterByTxAndWallet } from '@/services/account';
import { findPropertyById } from '@/services/listings';
import { useRouter } from 'next/navigation';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { polygonAddresses } from '@/constants/addresses';
import { useBlockchain } from '@/contexts/BlockchainContext';
import ConnectModal from '@/components/ConnectWalletModal';

export default function StayDetailPage() {
  const router = useRouter();
  const { transaction, setTransaction } = useTransaction() || {};
  const tx = transaction;
  const { address, isConnected } = useBlockchain();

  const [propData, setPropData] = useState<any | null>(null);
  const [buyerData, setBuyerData] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (transaction && address) {
        try {
          const prop = await findPropertyById(tx.property_id);
          setPropData(prop);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [transaction, address]);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {isConnected ? (
        <div className="flex flex-row lg:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-2/3 space-y-6">
            <button
              className="flex items-center text-blue-600 font-semibold"
              onClick={() => router.back()}
            >
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

            <section className="gap-4 items-center flex">
              {isConnected && (
                <BuyButton
                  buyer_id={tx?.buyer_id}
                  owner_id={tx?.owner_id}
                  amount={tx?.amount}
                  sellerAddress={tx?.owner_wallet}
                  owner_wallet={tx?.owner_wallet}
                  buyer_wallet={tx?.buyer_wallet}
                  tokenAddress={polygonAddresses.USDC}
                  tokenName={'USDC'}
                />
              )}
            </section>

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

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Terms and Conditions</h2>
              <p className="text-gray-600">
                By clicking on Create Transaction to book your trip, you agree
                to our{' '}
                <a href="#" className="text-blue-600 underline">
                  Terms and Conditions
                </a>
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="border rounded-lg overflow-hidden">
              <Image
                src={tx?.main_image || ''}
                alt={tx?.title || ''}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <p className="font-semibold">{tx?.attributes || ''}</p>
                <p className="font-semibold">
                  {tx?.attributes?.location || ''}
                </p>
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
                    {address?.substring(0, 8)}...
                    {address?.substring(address?.length - 5, address?.length)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Seller</p>
                  <p className="font-semibold">
                    {/* {tx?.owner_wallet?.substring(0, 8)}...
                  {tx?.owner_wallet?.substring(
                    tx?.owner_wallet?.length - 5,
                    tx?.owner_wallet.length
                  )} */}
                    {'C46KB5iG71zwaoQRyVtVEfZe95kaNRD6YYqeUnKcZWs'.substring(
                      0,
                      8
                    )}
                    ...
                    {'C46KB5iG71zwaoQRyVtVEfZe95kaNRD6YYqeUnKcZWs'.substring(
                      'C46KB5iG71zwaoQRyVtVEfZe95kaNRD6YYqeUnKcZWs'.length - 5,
                      'C46KB5iG71zwaoQRyVtVEfZe95kaNRD6YYqeUnKcZWs'.length
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
            Check-In
          </button> */}
          </div>
        </div>
      ) : (
        <section>
          <div className="flex justify-center items-center h-screen flex-col">
            <p className="text-2xl font-bold">Please connect your wallet</p>
            <ConnectModal />
          </div>
        </section>
      )}
    </div>
  );
}

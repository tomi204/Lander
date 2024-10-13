'use client';
import { Popover, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState, useMemo } from 'react';
import Avatar from '@/shared/Avatar';
import Link from 'next/link';
import WalletAddressComponent from '@/components/WalletAddressComponent';
import { Bed, Briefcase } from 'lucide-react';
import { AvatarDropdownProps } from '@/interfaces/Common';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { useWallet } from '@solana/wallet-adapter-react';
//import { Avatar as AvatarBase } from '@coinbase/onchainkit/identity';
//import CoinBaseIdentity from './CoinBaseIdentity';
import { useUser } from '@/contexts/UserContext';
import { useAppKit } from '@reown/appkit/react';
import CoinBaseIdentity from './CoinBaseIdentity';
import supabase from '@/supabase/client';

export default function AvatarDropdown({
  className = '',
  show,
}: AvatarDropdownProps) {
  const { user, loading, error, refreshUser } = useUser();

  const memoizedUser = useMemo(() => user, [user]);

  useEffect(() => {
    if (!memoizedUser && !loading && !error) {
      refreshUser();
    }
  });

  const [isSolana, setIsSolana] = useState(false);
  const { address, chain } = useBlockchain();
  const { open } = useAppKit();
  const { disconnect, select } = useWallet();

  if (!show) {
    return null;
  }

  const handleOpenModal = () => {
    if (chain === 'evm') {
      open({
        view: 'Account',
      });
    }
    if (chain === 'solana') {
      setIsSolana(true);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Popover className={`relative flex ${className}`}>
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`self-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 focus:outline-none flex items-center justify-end`}
          >
            <div className="flex items-center space-x-2 hover:bg-slate-100 dark:hover:bg-slate-800">
              <h4 className="font-semibold">{memoizedUser?.name}</h4>
              <Avatar
                imgUrl={memoizedUser?.avatar_url}
                sizeClass="w-12 h-12 sm:w-9 sm:h-9"
              />
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 top-full -right-10 sm:right-0 sm:px-0">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
                  <div className="flex items-center m-auto w-full justify-center">
                    <div className="flex-grow">
                      {chain === 'evm' && address ? (
                        <CoinBaseIdentity address={address} />
                      ) : (
                        <>
                          <Avatar sizeClass="w-12 h-12" />
                          <h4 className="font-semibold">USER</h4>
                          <p
                            className="text-xs mt-0.5"
                            onClick={handleOpenModal}
                          >
                            {/* <WalletAddressComponent address={address || ''} /> */}
                            {address &&
                              address.slice(0, 6) + '...' + address.slice(-4)}
                          </p>
                        </>
                      )}

                      {!isSolana ? (
                        <p
                          className="text-xs mt-0.5"
                          onClick={handleOpenModal}
                        ></p>
                      ) : (
                        <>
                          <p onClick={disconnect}>Disconnect</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

                  {/* ------------------ 1 --------------------- */}
                  <Link
                    href={'/profile'}
                    className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    onClick={() => close()}
                  >
                    <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium ">{'Account'}</p>
                    </div>
                  </Link>

                  {/* ------------------ 2 --------------------- */}
                  <Link
                    href={'/my-listing-stays'}
                    className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    onClick={() => close()}
                  >
                    <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8 12.2H15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 16.2H12.38"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium ">{'Listings'}</p>
                    </div>
                  </Link>
                  {/* ------------------ Bookings --------------------- */}
                  <Link
                    href={'/my-bookings'}
                    className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    onClick={() => close()}
                  >
                    <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                      <Bed className="w-6 h-6" /> {/* Nuevo icono de cama */}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium ">{'Bookings'}</p>
                    </div>
                  </Link>
                  {/* ------------------ Trips --------------------- */}
                  <Link
                    href={'/my-trips'}
                    className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    onClick={() => close()}
                  >
                    <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                      <Briefcase className="w-6 h-6" />{' '}
                      {/* Nuevo icono de maleta */}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium ">{'Trips'}</p>
                    </div>
                  </Link>

                  <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

                  {/* ------------------ 2 --------------------- */}
                  <Link
                    href={'/#'}
                    className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    onClick={() => close()}
                  >
                    <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 12H3.62"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="ml-4" onClick={() => handleSignOut()}>
                      <p className="text-sm font-medium ">{'Log out'}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

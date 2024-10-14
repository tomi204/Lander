'use client';
import { Popover, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState, useMemo } from 'react';
import Avatar from '@/shared/Avatar';
import Link from 'next/link';
import WalletAddressComponent from '@/components/WalletAddressComponent';
import { LogOut, User2Icon } from 'lucide-react';
import { AvatarDropdownProps } from '@/interfaces/Common';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { Calendar, Map } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useAppKit } from '@reown/appkit/react';
import CoinBaseIdentity from './CoinBaseIdentity';
import supabase from '@/supabase/client';
import { WalletModal } from '@/components/WalletModal';

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
              <h4 className="font-semibold text-nowrap">
                {memoizedUser?.name}
              </h4>
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
                      <User2Icon className="mr-2 h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium ">{'Account'}</p>
                    </div>
                  </Link>
                  <WalletModal />

                  {/* ------------------ 2 --------------------- */}
                  {/* <Link
                    href={'/my-listing-stays'}
                    className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    onClick={() => close()}
                  >
                    <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                      <Map className="mr-2 h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium ">{'Listings'}</p>
                    </div>
                  </Link> */}
                  {/* ------------------ Bookings --------------------- */}
                  <Link
                    href={'/my-bookings'}
                    className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    onClick={() => close()}
                  >
                    <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                      <Calendar className="mr-2 h-5 w-5" />
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
                      <Map className="w-6 h-6" />
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
                      <LogOut className="mr-2 h-5 w-5" />
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

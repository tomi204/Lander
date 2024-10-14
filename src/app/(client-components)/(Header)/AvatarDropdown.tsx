'use client';
import { Popover, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState, useMemo } from 'react';
import Avatar from '@/shared/Avatar';
import Link from 'next/link';
import { User, Calendar, Map, Zap, Wallet } from 'lucide-react';
import { LogOut, User2Icon } from 'lucide-react';
import { AvatarDropdownProps } from '@/interfaces/Common';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { useUser } from '@/contexts/UserContext';
import { useAppKit } from '@reown/appkit/react';
import CoinBaseIdentity from './CoinBaseIdentity';
import supabase from '@/supabase/client';
import { NavItem } from '@/interfaces/Common';
export default function AvatarDropdown({
  className = '',
  show,
}: AvatarDropdownProps) {
  const { user, loading, error, refreshUser } = useUser();
  const { open } = useAppKit();

  const memoizedUser = useMemo(() => user, [user]);

  useEffect(() => {
    if (!memoizedUser && !loading && !error) {
      refreshUser();
    }
  });

  const [isSolana, setIsSolana] = useState(false);
  const { address, chain } = useBlockchain();
  const { disconnect, select } = useWallet();

  const navItems: NavItem[] = [
    { name: 'Account', icon: User, href: { pathname: '/profile' } },
    {
      name: 'Wallet',
      icon: Wallet,
      href: { pathname: '' },
      function: () => {
        open({ view: 'Account' });
      },
    },
    { name: 'Trips', icon: Map, href: { pathname: '/my-trips' } },
    { name: 'Bookings', icon: Calendar, href: { pathname: '/my-bookings' } },
    // { name: 'Swap', icon: Zap, href: { pathname: '/swap' } },
    {
      name: 'Log out',
      icon: LogOut,
      href: { pathname: '' },
      function: () => handleSignOut(),
    },
  ];

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
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => close()}
                    >
                      <div
                        className="flex items-center"
                        onClick={item?.function}
                      >
                        <item.icon className="mr-2 h-5 w-5" />
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

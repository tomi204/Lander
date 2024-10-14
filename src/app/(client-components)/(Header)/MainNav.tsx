import React, { FC, useEffect, useMemo, useState } from 'react';
import Logo from '@/shared/Logo';
import Navigation from '@/shared/Navigation/Navigation';
import AvatarDropdown from './AvatarDropdown';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { MainNavProps } from '@/interfaces/Common';
import { useHydrated } from '@/hooks/useHydrated';
import Link from 'next/link';
import supabase from '@/utils/supabase/client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MobileNav from './MobileNav';

const PAGE_WITH_SEARCH: string[] = ['/'];

const MainNav: FC<MainNavProps> = ({ className = '' }) => {
  const [user, setUser] = useState<any>(null);

  const [session, setSession] = useState<any>(null);

  const pathname = usePathname();

  const connected = user !== null ? true : false;
  const { isConnected, address } = useBlockchain();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );
    setSession(authListener);
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const showSearch = useMemo(
    () => PAGE_WITH_SEARCH.includes(pathname),
    [pathname]
  );

  return (
    <div className={`flex nc-MainNav1 relative z-10 ${className}`}>
      <div className="px-4 container h-20 relative flex justify-between">
        <div
          className={`${
            showSearch ? 'sm:hidden' : ''
          } flex justify-start flex-1 space-x-4 sm:space-x-10`}
        >
          <Logo className="w-24 self-center sm:hidden hidden md:block lg:block xl:block 2xl:block" />
        </div>
        <Navigation />

        <div className="flex  flex-shrink-0  justify-end flex-1 text-neutral-700 dark:text-neutral-100 ">
          {useHydrated() && (
            <div className="flex justify-around space-x-0.5 gap-6 items-center ">
              <div className="sm:hidden">
                {!isConnected && (
                  <ConnectButton
                    accountStatus={'avatar'}
                    showBalance={false}
                    chainStatus={'none'}
                    label="Connect"
                  />
                )}
              </div>

              <div className="px-10" />
              {!user && (
                <button className="shadow-[inset_0_0_0_2px_#2935db] text-black px-8 py-2 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#2935db] hover:text-white dark:text-neutral-200 transition duration-200">
                  <Link href="/login">Log in</Link>
                </button>
              )}
              <AvatarDropdown show={connected} />
            </div>
          )}
        </div>
        <MobileNav />
      </div>
    </div>
  );
};

export default MainNav;

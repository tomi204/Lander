import React, { FC, useEffect, useMemo, useState } from 'react';
import Logo from '@/shared/Logo';
import Navigation from '@/shared/Navigation/Navigation';
import AvatarDropdown from './AvatarDropdown';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import SearchFormMobile from '../(HeroSearchFormMobile)/SearchFormMobile';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { MainNavProps } from '@/interfaces/Common';
import ConnectModal from '@/components/ConnectWalletModal';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useHydrated } from '@/hooks/useHydrated';
import Link from 'next/link';
import supabase from '@/utils/supabase/client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { getTalentByWallet } from '@/services/talent';
import { useUser } from '@/contexts/UserContext';

const PAGE_WITH_SEARCH: string[] = ['/'];

const MainNav: FC<MainNavProps> = ({ className = '' }) => {
  const [user, setUser] = useState<any>(null);
  const { logOut, isAuth } = useAuth();

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
          <Logo className="w-24 self-center" />
        </div>
        <Navigation />
        {showSearch && (
          <div className="flex lg:hidden flex-[3] max-w-lg !mx-auto md:px-3 ">
            <div className="self-center flex-1">
              <SearchFormMobile />
            </div>
          </div>
        )}

        <div className="flex  flex-shrink-0  justify-end flex-1 text-neutral-700 dark:text-neutral-100">
          {useHydrated() && (
            <div className="flex justify-around space-x-2 gap-10 items-center ">
              {/* {!isConnected && <ConnectModal />} */}
              {!isConnected && <ConnectButton />}
              <div className="px-10" />
              {!user && (
                <button className="shadow-[inset_0_0_0_2px_#2935db] text-black px-8 py-2 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#2935db] hover:text-white dark:text-neutral-200 transition duration-200">
                  <Link href="/login">Log-in</Link>
                </button>
              )}
              <AvatarDropdown show={connected} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNav;

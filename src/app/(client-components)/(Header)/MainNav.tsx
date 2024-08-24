import React, { FC, useCallback, useMemo } from "react";
import Logo from "@/shared/Logo";
import Navigation from "@/shared/Navigation/Navigation";
import ButtonPrimary from "@/shared/ButtonPrimary";
import AvatarDropdown from "./AvatarDropdown";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import SearchFormMobile from "../(HeroSearchFormMobile)/SearchFormMobile";
import { ApolloWrapper } from "@/contexts/ApolloProvider";
import PolygonLogo from "@/images/logos/polygon-white.svg";
import Image from "next/image";

const PAGE_WHIT_SEARCH: string[] = ["/"];

export interface MainNav1Props {
  className?: string;
}

const MainNav: FC<MainNav1Props> = ({ className = "" }) => {
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const { logOut, isAuth } = useAuth();
  const { disconnectAsync } = useDisconnect();

  const pathname = usePathname();

  const showSearch = useMemo(() => PAGE_WHIT_SEARCH.includes(pathname), [pathname]);
  const onConnectHandler = useCallback(
    async (event: any) => {
      event.preventDefault();
      await disconnectAsync();
      await open();
    },
    [open, disconnectAsync]
  );

  return (
    <ApolloWrapper>
      <div className={`flex nc-MainNav1 relative z-10  ${className}`}>
        <div className="px-4 container h-20 relative flex justify-between">
          <div
            className={`${
              showSearch ? "sm:hidden" : ""
            } flex justify-start flex-1 space-x-4 sm:space-x-10`}
          >
            <Logo className="w-24 self-center" />
            <Navigation />
          </div>

          {showSearch && (
            <div className="flex lg:hidden flex-[3] max-w-lg !mx-auto md:px-3 ">
              <div className="self-center flex-1">
                <SearchFormMobile />
              </div>
            </div>
          )}

          <div className="flex flex-shrink-0 justify-end flex-1 text-neutral-700 dark:text-neutral-100">
            <div className="flex justify-end space-x-0.5">
              {/* <SwitchDarkMode /> */}
              {/* <SearchDropdown className="flex items-center" /> */}
              <div className="px-1" />

              {!isAuth && (
                <ButtonPrimary
                  onClick={onConnectHandler}
                  className="self-center sm:text-s sm:p-2 md:px-4 md:py-1"
                >
                  <Image src={PolygonLogo} alt="" className="h-9 w-9 mr-0.5 sm:h-6" />
                  <span className="sm:text-s mr-2">Connect</span>
                </ButtonPrimary>
              )}

              <AvatarDropdown
                show={isAuth}
                address={address ?? ""}
                onLogout={() => {
                  logOut();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </ApolloWrapper>
  );
};

export default MainNav;

import React, { FC } from "react";
import imagePng from "@/images/hero-right.png";
import SearchForm from "../(client-components)/(HeroSearchForm)/SearchForm";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface SectionHeroProps {
  className?: string;
}

const SectionHome: FC<SectionHeroProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl !leading-[114%] ">
            Cryptobed
          </h2>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            Decentralized and anonymous protocol for short-term rentals on the Ethereum ecosystem
          </span>
          {/* <ButtonPrimary href="/listing/stays" sizeClass="px-5 py-4 sm:px-7">
            Start your search
          </ButtonPrimary> */}
        </div>
        <div className="flex-grow">
          <Image className="w-full" src={imagePng} alt="hero" priority />
        </div>
      </div>

      <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-40 w-full">
        <SearchForm />
      </div>
    </div>
  );
};

export default SectionHome;

import React, { FC, ReactNode } from "react";
import SearchForm, { SearchTab } from "../(client-components)/(HeroSearchForm)/SearchForm";
import Image, { StaticImageData } from "next/image";
import { HomeSettings } from "@/constants/home";
import Logo from "@/shared/Logo";

export interface SectionHeroArchivePageProps {
  className?: string;
  listingType?: ReactNode;
  rightImage?: StaticImageData;
  settings: HomeSettings;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = "",
  listingType,
  rightImage,
  settings,
}) => {
  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
      data-nc-id="SectionHeroArchivePage"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <Logo className="md:hidden" />
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 lg:pb-64 xl:pb-80 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="sm:hidden font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
            {settings.title}
          </h2>
          <h2 className="md:hidden font-medium text-2xl leading-[110%]">{settings.title}</h2>
          <div className="flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            {/* <i className="text-2xl las la-map-marked"></i> */}
            <span className="">{settings.description}</span>
            {settings.link && (
              <a target="_blank" className="" href={settings.link?.link}>
                <span className="mx-2">{"-"}</span>
                <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  {settings.link.name}
                </span>
              </a>
            )}
            {/* {listingType ? (
              listingType
            ) : (
              <>
                <i className="text-2xl las la-home"></i>
                <span className="ml-2.5">112 properties</span>
              </>
            )} */}
          </div>
        </div>
        <div className="flex-grow">
          <Image
            className="w-full"
            src={settings.image}
            alt="heroko"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </div>
      </div>

      <div className="hidden lg:flow-root w-full">
        <div className="z-10 lg:-mt-40 xl:-mt-56 w-full">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default SectionHeroArchivePage;

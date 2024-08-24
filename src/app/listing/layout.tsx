import BackgroundSection from "@/components/BackgroundSection";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import React, { ReactNode } from "react";
import SectionHeroArchivePage from "../(server-components)/SectionHeroArchivePage";
import { headers } from "next/headers";
import { homeSettingsConst } from "@/constants/home";

const Layout = ({ children }: { children: ReactNode }) => {
  const country = headers().get("x-vercel-ip-country") ?? "AR";

  const settings = homeSettingsConst[country] ?? homeSettingsConst["AR"];

  return (
    <div className={`nc-ListingStayPage relative `}>
      <BgGlassmorphism />

      {/* SECTION HERO */}
      {/* TODO: Read info from server */}
      <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
        <SectionHeroArchivePage settings={settings} />
      </div>

      {children}

      {/* <div className="container overflow-hidden">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Layout;

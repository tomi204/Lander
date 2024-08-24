"use client";

import React, { ReactNode } from "react";

// stay/detail/

// TODO: integrate images from remote
const DetailLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="ListingDetailPage sm:pb-40">
      <div className="container ListingDetailPage__content">{children}</div>

      {/* OTHER SECTION */}
      {/* <div className="container py-24 lg:py-32">
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

export default DetailLayout;

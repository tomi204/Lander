"use client";

import React, { FC, useState } from "react";
import AnyReactComponent from "@/components/AnyReactComponent/AnyReactComponent";
import GoogleMapReact from "google-map-react";
import ButtonClose from "@/shared/ButtonClose";
import Checkbox from "@/shared/Checkbox";
import Pagination from "@/shared/Pagination";
// import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import StayCard2 from "@/components/StayCard2";
import { Stay } from "@/data/types";

interface StayListProps {
  items: Stay[];
}

const StayList: FC<StayListProps> = ({ items }) => {
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);

  return (
    <div>
      <div className="relative flex min-h-screen">
        {/* CARDS */}
        <div className="min-h-screen w-full xl:w-[60%] 2xl:w-[60%] max-w-[1184px] flex-shrink-0 xl:px-8 ">
          <Heading2 className="!mb-8" heading="Stays in Argentina" />
          {/* TODO: Implement filters */}
          {/* <div className="mb-8 lg:mb-11">
            <TabFilters />
          </div> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 2xl:gap-x-6 gap-y-8">
            {items.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setCurrentHoverID((_) => item.id)}
                onMouseLeave={() => setCurrentHoverID((_) => -1)}
              >
                <StayCard2 data={{ ...item, id: item.id }} />
              </div>
            ))}
          </div>
          {/* TODO: add pagination */}
          {/* <div className="flex mt-16 justify-center items-center">
            <Pagination />
          </div> */}
        </div>

        {/* TODO: Fix map render */}
        {/* {!showFullMapFixed && (
          <div
            className={`flex xl:hidden items-center justify-center fixed bottom-16 md:bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-neutral-900 text-white shadow-2xl rounded-full z-30  space-x-3 text-sm cursor-pointer`}
            onClick={() => setShowFullMapFixed(true)}
          >
            <i className="text-lg las la-map"></i>
            <span>Show map</span>
          </div>
        )} */}

        {/* MAPPPPP */}
        {/* TODO: Fix map render */}
        {/* <div
          className={`xl:flex-1 xl:static xl:block ${
            showFullMapFixed ? "fixed inset-0 z-50" : "hidden"
          }`}
        >
          {showFullMapFixed && (
            <ButtonClose
              onClick={() => setShowFullMapFixed(false)}
              className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
            />
          )}

          <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
            <div className="absolute bottom-5 left-3 lg:bottom-auto lg:top-2.5 lg:left-1/2 transform lg:-translate-x-1/2 py-2 px-4 bg-white dark:bg-neutral-800 shadow-xl z-10 rounded-2xl min-w-max">
              <Checkbox
                className="text-xs xl:text-sm"
                name="xx"
                label="Search as I move the map"
              />
            </div>
            {items?.length && (
              <GoogleMapReact
                defaultZoom={12}
                defaultCenter={{ lat: items[0].lat, lng: items[0].lng }}
                bootstrapURLKeys={{
                  key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "",
                }}
                yesIWantToUseGoogleMapApiInternals
              >
                {items.map((item) => (
                  <AnyReactComponent
                    isSelected={currentHoverID === item.id}
                    key={item.id}
                    lat={item.lat}
                    lng={item.lng}
                    listing={item}
                  />
                ))}
              </GoogleMapReact>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default StayList;

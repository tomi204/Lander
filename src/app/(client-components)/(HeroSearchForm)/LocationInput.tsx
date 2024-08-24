"use client";

import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect, FC } from "react";
import ClearDataButton from "./ClearDataButton";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import { covertApolloResponseToLocations } from "@/adapters/stay.adapters";
import { GraphQLStayResponse } from "@/interfaces/Stay";
import { useDebounce } from "usehooks-ts";

export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
  onChange?: (item: string) => void;
  onSelect?: (item: string) => void;
  onClear?: () => void;
}

const LocationInput: FC<LocationInputProps> = ({
  onSelect,
  onChange,
  onClear,
  autoFocus = false,
  placeHolder = "Location",
  desc = "Where are you going?",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce<string>(searchValue, 100);

  const locationsQuery = gql`
    query Locations($address: String) {
      stays(filters: { address: { containsi: $address } }, pagination: { page: 1, pageSize: 10 }) {
        data {
          attributes {
            address
          }
        }
      }
    }
  `;

  const { data } = useSuspenseQuery<GraphQLStayResponse>(locationsQuery, {
    variables: { address: debouncedSearchValue },
  });
  const locations = covertApolloResponseToLocations(data);

  const [showPopover, setShowPopover] = useState(autoFocus);

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopover]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
    // CLICK OUT_SIDE
    setShowPopover(false);
  };

  const handleSelectLocation = (item: string) => {
    setSearchValue(item);
    setShowPopover(false);
    onSelect && onSelect(item);
  };

  const renderSearchValue = () => {
    return (
      <>
        <h3 className="block  mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base sm:text-lg text-neutral-800 dark:text-neutral-100">
          {locations.length} Suggestions
        </h3>
        <div className="mt-2">
          {locations.map((item) => (
            <span
              onClick={() => handleSelectLocation(item)}
              key={item}
              className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <span className="block text-neutral-400">
                <ClockIcon className="h-4 sm:h-6 w-4 sm:w-6" />
              </span>
              <span className=" block font-medium text-neutral-700 dark:text-neutral-200">
                {item}
              </span>
            </span>
          ))}
        </div>
      </>
    );
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
    onChange && onChange(event.currentTarget.value);
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
          showPopover ? "nc-hero-field-focused" : ""
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow">
          <input
            className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
            placeholder={placeHolder}
            value={searchValue}
            autoFocus={showPopover}
            onChange={onChangeHandler}
            ref={inputRef}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!searchValue ? placeHolder : desc}</span>
          </span>
          {searchValue && showPopover && (
            <ClearDataButton
              onClick={() => {
                setSearchValue("");
                onClear && onClear();
              }}
            />
          )}
        </div>
      </div>

      {showPopover && searchValue && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:max-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {renderSearchValue()}
        </div>
      )}
    </div>
  );
};

export default LocationInput;

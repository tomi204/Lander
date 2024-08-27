"use client";

import CommentListing from "@/components/CommentListing";
import StartRating from "@/components/StartRating";
import React, { FC, Fragment, useState } from "react";
import Avatar from "@/shared/Avatar";
import ButtonSecondary from "@/shared/ButtonSecondary";
import SocialsList from "@/shared/SocialsList";
import { Book } from "@/interfaces/Booking";
import { StrapiPaginatedResult } from "@/interfaces/StrapiPaginatedResults";
import BookCard from "@/components/BookCard/BookCard";
import { Tab } from "@headlessui/react";

enum tabs {
  guest = "guest",
  host = "host",
}
export interface MyBookingsProps {
  books: StrapiPaginatedResult<Book>;
  booksHost: StrapiPaginatedResult<Book>;
}

const MyBookingsPage: FC<MyBookingsProps> = ({ books, booksHost }) => {
  const booksResults = books.data;
  const booksHostResults = booksHost.data;

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        <div className="sm:hidden">
          <h2 className="text-2xl font-semibold">Bookings</h2>
        </div>
        <div className="w-28 border-b border-neutral-200 dark:border-neutral-700 sm:hidden"></div>

        <Tab.Group>
          <Tab.List className="flex space-x-1">
            <Tab key={tabs.guest} as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                    selected
                      ? "bg-primary-500 text-primary-50"
                      : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  } `}
                >
                  Your bookings
                </button>
              )}
            </Tab>
            <Tab key={tabs.host} as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex-shrink-0  block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                    selected
                      ? "bg-primary-500 text-primary-50 "
                      : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  } `}
                >
                  Guests Bookings
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel key={tabs.guest}>
              <div>
                <div className="mt-8 sm:mt-0 grid grid-cols-2 sm:grid-cols-1 gap-6 md:gap-7">
                  {booksResults.map((book) => (
                    <BookCard key={book.id} book={{ ...book.attributes, id: book.id }} />
                  ))}
                </div>
                {/* <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div> */}
              </div>
            </Tab.Panel>
            <Tab.Panel key={tabs.host}>
              <div>
                <div className="mt-8 sm:mt-0 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 md:gap-7">
                  {booksHostResults
                    // .filter((_, i) => i < 4)
                    .map((book) => (
                      <BookCard key={book.id} book={{ ...book.attributes, id: book.id }} />
                    ))}
                </div>
                {/* <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div> */}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing hasListingTitle className="pb-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  return (
    // <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
    <div className="w-full space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
      {renderSection1()}
      {/* {renderSection2()} */}
    </div>
  );
};

export default MyBookingsPage;

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



export interface MyBookingsProps {
  books: StrapiPaginatedResult<Book>;
  booksHost: StrapiPaginatedResult<Book>;
}

const MyBookingsPage: FC<MyBookingsProps> = ({  }) => {






  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        <div className="sm:hidden">
          <h2 className="text-2xl font-semibold">Bookings</h2>
        </div>
        <div className="w-28 border-b border-neutral-200 dark:border-neutral-700 sm:hidden"></div>


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

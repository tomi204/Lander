import React from "react";
import SectionGridHasMap from "../SectionGridHasMap";
import { findListings } from "@/services/listings";
import { Stay } from "@/data/types";
import { notFound } from "next/navigation";

export interface ListingStayMapPageProps {
  searchParams: {
    location: string;
    from: string;
    to: string;
    guests: string;
  };
}
export default async function ListingStayMapPage({
  searchParams,
}: ListingStayMapPageProps) {
  // TODO: Add paginated results
  let items: any;
  try {
    // TODO: change this implementation to recibe paginated results
    items = await findListings({
      populate: "*",
      filters: {
        address: {
          $contains: searchParams.location,
        },
        maxGuests: {
          $gte: searchParams.guests,
        },
        // from: searchParams.from ?? "",
        // to: searchParams.to ?? "",
      },
    });
  } catch (error) {
    console.log("error", error);
    notFound();
  }
const properties = items.map((item:any) => item.attributes);
  return (
    <div className="container pb-6 2xl:pl-10 xl:pr-0 xl:max-w-none">
      <SectionGridHasMap properties={properties}  items={items} />
    </div>
  );
}

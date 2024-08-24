import React from "react";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { RedirectType } from "next/dist/client/components/redirect";
import { findUserListingsSSR } from "@/services/listings";
import MyListingStaysContainer from "./MyListingStaysContainer";
import CryptoBedSeo from "@/constants/seo";
import { Metadata } from "next";

export interface MyBookingsProps {}

export const metadata: Metadata = {
  ...CryptoBedSeo,
  title: "CryptoBed - Your Listed Stays",
  description: "Check your stays here.",
};

export default async function MyBookings({}: MyBookingsProps) {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) {
      redirect("/", RedirectType.replace);
    }

    const stays = await findUserListingsSSR(jwt.value, { populate: "*" });
    return <MyListingStaysContainer stays={stays.data} />;
  } catch (error) {
    console.log(error);
    notFound();
  }
}

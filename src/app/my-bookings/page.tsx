import React from "react";
import { notFound, redirect } from "next/navigation";
import MyBookingsContainer from "./MyBookingsContainer";
import { cookies } from "next/headers";
import { findHostBookingsSSR, findUsersBookingsSSR } from "@/services/books";
import { RedirectType } from "next/dist/client/components/redirect";
import CryptoBedSeo from "@/constants/seo";
import { Metadata } from "next";

export interface MyBookingsProps {}

export const metadata: Metadata = {
  ...CryptoBedSeo,
  title: "CryptoBed - Your Bookings",
  description: "Check your bookings here. And start a claim if you need to.",
};

export default async function MyBookings({}: MyBookingsProps) {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) {
      redirect("/", RedirectType.replace);
    }

    const [books, booksHost] = await Promise.all([
      findUsersBookingsSSR(jwt.value, { populate: "*" }),
      findHostBookingsSSR(jwt.value, { populate: "*" }),
    ]);
    return <MyBookingsContainer books={books.data} booksHost={booksHost.data} />;
  } catch (error) {
    console.log(error);
    notFound();
  }
}

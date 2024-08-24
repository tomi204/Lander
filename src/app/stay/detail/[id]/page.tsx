import React from "react";
import StayDetailContainer from "../DetailContainer";
import { findStayById } from "@/services/listings";
import { notFound } from "next/navigation";
import CryptoBedSeo from "@/constants/seo";
import { Metadata } from "next";

export interface StayDetailPageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  ...CryptoBedSeo,
  title: "CryptoBed - Stay Detail",
  description: "Reserve your stay with CryptoBed. Pay with crypto.",
};

export default async function StayDetailPage({ params }: StayDetailPageProps) {
  try {
    const stay = await findStayById(params.id);
    return <StayDetailContainer stay={stay} />;
  } catch (error) {
    console.log(error);
    notFound();
    return;
  }
}

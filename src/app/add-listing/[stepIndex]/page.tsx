import React from "react";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { findTaxonomies } from "@/services/taxonomy";
import { findCountries } from "@/services/country";
import { findAmenities } from "@/services/amenities";
import StayStepperContainer from "./StepsContainer";
import { RedirectType } from "next/dist/client/components/redirect";

export interface AddListingPageProps {
  params: { stepIndex: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export type StayFormValues = {
  taxonomyType: string;
  type: string;
  placeName: string;
};

export default async function AddListingPage({
  params,
  searchParams,
}: AddListingPageProps) {
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt");

  if (!jwt) {
    redirect("/", RedirectType.replace);
  }
  try {
    const taxonomies = await findTaxonomies();
    const countries = await findCountries();
    const amenities = await findAmenities();

    return (
      <StayStepperContainer
        params={params}
        searchParams={searchParams}
        taxonomies={taxonomies}
        countries={countries}
        amenities={amenities}
        step={Number(params.stepIndex)}
      />
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}

"use client";

import React, { FC, useEffect, useState } from "react";
import PageAddListing1 from "./PageAddListing1";
import PageAddListing10 from "./PageAddListing10";
import PageAddListing2 from "./PageAddListing2";
import PageAddListing3 from "./PageAddListing3";
import PageAddListing4 from "./PageAddListing4";
import PageAddListing5 from "./PageAddListing5";
import PageAddListing6 from "./PageAddListing6";
import PageAddListing7 from "./PageAddListing7";
import PageAddListing8 from "./PageAddListing8";
import PageAddListing9 from "./PageAddListing9";
import { notFound, useRouter } from "next/navigation";
import { findTaxonomies } from "@/services/taxonomy";
import { findCountries } from "@/services/country";
import { TaxonomyType, Country, Amenity } from "@/data/types";
import { findAmenities } from "@/services/amenities";
import {
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { Route } from "next";
import ButtonSecondary from "@/shared/ButtonSecondary";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useStay } from "@/contexts/StayProvider";
import { StayPayloadRequest } from "@/interfaces/StayPayloadRequest";
import useCreateStay from "@/hooks/useCreateData";

export interface PageAddListingProps {
  taxonomies: TaxonomyType[];
  countries: Country[];
  amenities: Amenity[];
  register: UseFormRegister<StayPayloadRequest>;
  setValue: UseFormSetValue<StayPayloadRequest>;
}

export interface StayStepperContainerProps {
  params: { stepIndex: string };
  searchParams?: { [key: string]: string | string[] | undefined };
  taxonomies: TaxonomyType[];
  countries: Country[];
  amenities: Amenity[];
  step: number;
}

const StayStepperContainer: FC<StayStepperContainerProps> = ({
  params,
  step,
  amenities,
  countries,
  taxonomies,
  searchParams,
}: StayStepperContainerProps) => {
  const { stayData, setStayData } = useStay();
  const { register, handleSubmit, setValue } = useForm<StayPayloadRequest>({
    values: { ...stayData } as StayPayloadRequest,
  });
  const router = useRouter();
  const [{ data, error }, executePost] = useCreateStay();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const nextHref = (
    step < 8 ? `/add-listing/${step + 1}` : `/add-listing/${1}`
  ) as Route;

  const onSubmit: SubmitHandler<StayPayloadRequest> = (data) => {
    setStayData({ ...stayData, ...data });
    setErrorMessage("");

    if (step === 5 && (!data?.galleryImgs || !data?.featuredImage)) {
      setErrorMessage("Please upload all images");
      return;
    }

    if (step > 7) {
      executePost({
        data: { data: stayData },
      });
      return;
    }

    router.push(nextHref);
  };

  useEffect(() => {
    if (data?.data.id) {
      setStayData({});
      router.push(`/stay/detail/${data?.data.id}`);
    }
  }, [data]);

  const backHref = (
    step > 1 ? `/add-listing/${step - 1}` : `/add-listing/${1}`
  ) as Route;
  const nextBtnText = step > 7 ? "Publish listing" : "Continue";

  let ContentComponent = PageAddListing1;

  switch (Number(params.stepIndex)) {
    case 1:
      ContentComponent = PageAddListing1;
      break;
    case 2:
      ContentComponent = PageAddListing2;
      break;
    case 3:
      ContentComponent = PageAddListing3;
      break;
    // case 4:
    //   ContentComponent = PageAddListing4;
    //   break;
    // case 5:
    //   ContentComponent = PageAddListing5;
    //   break;
    case 4:
      ContentComponent = PageAddListing6;
      break;
    case 5:
      ContentComponent = PageAddListing7;
      break;
    case 6:
      ContentComponent = PageAddListing8;
      break;
    case 7:
      ContentComponent = PageAddListing9;
      break;
    case 8:
      ContentComponent = PageAddListing10;
      break;

    default:
      ContentComponent = PageAddListing1;
      break;
  }

  const checkKeyDown = (e: any) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={checkKeyDown}>
      <ContentComponent
        taxonomies={taxonomies}
        countries={countries}
        amenities={amenities}
        register={register}
        setValue={setValue}
      />
      <div className="flex flex-col items-end mt-10">
        <div className="flex space-x-10 sm:justify-around sm:w-full">
          <ButtonSecondary href={backHref}>Go back</ButtonSecondary>
          <ButtonPrimary type="submit">
            {nextBtnText || "Continue"}
          </ButtonPrimary>
        </div>
        <div className="text-center">
          <div className="text-red-700 px-4 py-3 rounded relative" role="alert">
            {error?.message}
          </div>
          <div className="text-red-700 px-4 py-3 rounded relative" role="alert">
            {errorMessage}
          </div>
        </div>
      </div>
    </form>
  );
};

export default StayStepperContainer;

"use client";

import React, { FC, useEffect, useState } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { PageAddListingProps } from "./StepsContainer";
import { styled } from "styled-components";
import InputAddress from "@/shared/InputAddress";

const InputHidden = styled.input`
  display: none;
`;

const PageAddListing2: FC<PageAddListingProps> = ({
  countries,
  register,
  setValue,
}) => {
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    let countryId = countries[0].id;

    setValue("country", countryId ?? "");
  }, [countries, setValue]);

  return (
    <>
      <h2 className="text-2xl font-semibold">Your place location</h2>
      {/* FORM */}
      <div className="space-y-8">
        {/* <ButtonSecondary>
          <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400">
            Not Available
          </MapPinIcon>
        </ButtonSecondary> */}

        <FormItem label="Country/Region">
          <Select
            {...register("country", {
              required: true,
            })}
          >
            {countries.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="Address Line">
          <InputAddress
            {...register("address", {
              required: true,
            })}
            onPlaceSelected={(place) => {
              const addressComponents = place.address_components || [];

              const city = addressComponents.find((component: any) =>
                component.types.includes("locality")
              );
              const state = addressComponents.find((component: any) =>
                component.types.includes("administrative_area_level_1")
              );

              const lat = place.geometry?.location.lat() ?? 0;
              const lng = place.geometry?.location.lng() ?? 0;

              setValue("city", city?.long_name || "");
              setValue("state", state?.long_name || "");
              setValue("lat", lat);
              setValue("lng", lng);
              setValue("address", place.formatted_address || "");

              setLocation({
                lat,
                lng,
              });
            }}
          />
        </FormItem>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
          <FormItem label="City">
            <Input
              {...register("city", {
                required: true,
              })}
            />
          </FormItem>
          <FormItem label="State">
            <Input
              {...register("state", {
                required: true,
              })}
            />
          </FormItem>
          <FormItem label="Postal code">
            <Input
              {...register("zipCode", {
                required: true,
              })}
            />
          </FormItem>
          <InputHidden
            {...register("lat", {
              required: true,
            })}
          />
          <InputHidden
            {...register("lng", {
              required: true,
            })}
          />
        </div>
        {/* <div>
          <Label>Detailed address</Label>
          <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400"></span>
          <div className="mt-4">
            <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
              <div className="rounded-xl overflow-hidden">
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || "",
                  }}
                  yesIWantToUseGoogleMapApiInternals={false}
                  defaultZoom={15}
                >
                  <LocationMarker lat={location.lat} lng={location.lng} />
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default PageAddListing2;

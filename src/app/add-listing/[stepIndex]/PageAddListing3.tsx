import NcInputNumber from "@/components/NcInputNumber";
import React, { FC } from "react";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { PageAddListingProps } from "./StepsContainer";

const PageAddListing3: FC<PageAddListingProps> = ({ register, setValue }) => {
  const OnChangeInputHandler = (
    name: "maxGuests" | "bedrooms" | "bathrooms" | "kitchens" | "beds",
    value: number
  ) => {
    setValue(name, value);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold">Size of your location</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem label="Acreage (m2)">
          <Select {...register("acreage", { required: true })}>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
          </Select>
        </FormItem>
        <NcInputNumber
          label="Guests"
          defaultValue={0}
          onChange={(value) => OnChangeInputHandler("maxGuests", value)}
        />
        <NcInputNumber
          label="Bedroom"
          defaultValue={0}
          onChange={(value) => OnChangeInputHandler("bedrooms", value)}
        />
        <NcInputNumber
          label="Beds"
          defaultValue={0}
          onChange={(value) => OnChangeInputHandler("beds", value)}
        />
        <NcInputNumber
          label="Bathroom"
          defaultValue={0}
          onChange={(value) => OnChangeInputHandler("bathrooms", value)}
        />
        <NcInputNumber
          label="Kitchen"
          defaultValue={0}
          onChange={(value) => OnChangeInputHandler("kitchens", value)}
        />
      </div>
    </>
  );
};

export default PageAddListing3;

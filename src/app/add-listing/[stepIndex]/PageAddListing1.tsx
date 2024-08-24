"use client";

import React, { FC } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { PageAddListingProps } from "./StepsContainer";

const PageAddListing1: FC<PageAddListingProps> = ({ taxonomies, register }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem
          label="Choose a property type"
          desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
        >
          <Select
            {...register("listingCategory", {
              required: true,
            })}
          >
            {taxonomies.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          label="Place name"
          desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
        >
          <Input
            placeholder="Places name"
            {...register("name", {
              required: true,
              minLength: 4,
              maxLength: 100,
            })}
          />
        </FormItem>
        <FormItem
          label="Rental form"
          desc="Entire place: Guests have the whole place to themselves—there's a private entrance and no shared spaces. A bedroom, bathroom, and kitchen are usually included."
        >
          <Select
            {...register("rentalForm", {
              required: true,
            })}
          >
            <option value="entire">Entire place</option>
            <option value="private">Private room</option>
            <option value="share">Share room</option>
          </Select>
        </FormItem>
      </div>
    </>
  );
};

export default PageAddListing1;

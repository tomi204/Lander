import React, { FC } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { PageAddListingProps } from "./StepsContainer";

const decimalRegex = /^\d+(\.\d{1,2})?$/;

const PageAddListing8: FC<PageAddListingProps> = ({ register }) => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Price your space</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {` The host's revenue is directly dependent on the setting of rates and
            regulations on the number of guests, the number of nights, and the
            cancellation policy.`}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem label="Currency">
          <Select {...register("preferredCoin", { required: true })}>
            <option value="usdt">USDT</option>
            {/* <option value="dai">DAI</option> */}
          </Select>
        </FormItem>
        <FormItem label="Price">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input
              className="!pl-8 !pr-10"
              placeholder="0.00"
              {...register("price", {
                required: true,
                pattern: {
                  value: decimalRegex,
                  message: "The format must be 0.00",
                },
              })}
            />
          </div>
        </FormItem>
        <FormItem label="Guaranty for your stay">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input
              className="!pl-8 !pr-10"
              placeholder="0.00"
              {...register("guarantyPrice", {
                required: true,
                pattern: {
                  value: decimalRegex,
                  message: "The format must be 0.00",
                },
              })}
            />
          </div>
        </FormItem>
        <FormItem label="Cleaning service fee">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input
              className="!pl-8 !pr-10"
              placeholder="0.00"
              {...register("cleaningServiceFee", {
                required: true,
                pattern: {
                  value: decimalRegex,
                  message: "The format must be 0.00",
                },
              })}
            />
          </div>
        </FormItem>
        {/* ----- */}
        {/* <FormItem label="Base price  (Friday-Sunday)">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input className="!pl-8 !pr-10" placeholder="0.00" />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </FormItem>
        {/* ----- */}
        {/* <FormItem label="Long term price (Monthly discount) ">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
            <Input className="!pl-8 !pr-10" placeholder="0.00" />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">every month</span>
            </div>
          </div>
        </FormItem> */}
      </div>
    </>
  );
};

export default PageAddListing8;

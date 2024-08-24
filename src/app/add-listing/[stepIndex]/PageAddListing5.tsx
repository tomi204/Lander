"use client";

import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import { PageAddListingProps } from "./StepsContainer";

const PageAddListing5: FC<PageAddListingProps> = () => {
  // TODO: Get from server
  const [additionalRules, setAdditionalRules] = useState<string[]>([
    "No smoking in common areas",
    "Do not wear shoes/shoes in the house",
    "No cooking in the bedroom",
  ]);

  const [newRule, setNewRule] = useState("");

  const handleAddRule = () => {
    setAdditionalRules([...additionalRules, newRule]);
    setNewRule("");
  };

  const handleRemoveRule = (index: number) => {
    const newRules = [...additionalRules];
    newRules.splice(index, 1);
    setAdditionalRules(newRules);
  };

  const renderRadio = (
    name: string,
    id: string,
    label: string,
    defaultChecked?: boolean
  ) => {
    return (
      <div className="flex items-center">
        <input
          defaultChecked={defaultChecked}
          id={id + name}
          name={name}
          type="radio"
          className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
        />
        <label
          htmlFor={id + name}
          className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      </div>
    );
  };

  const renderNoInclude = (text: string, index: number) => {
    return (
      <div
        key={`additional-rule-${index}`}
        className="flex items-center justify-between py-3"
      >
        <span className="text-neutral-6000 dark:text-neutral-400 font-medium">
          {text}
        </span>
        <i
          onClick={() => handleRemoveRule(index)}
          className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"
        ></i>
      </div>
    );
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">
          Set house rules for your guests{" "}
        </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Guests must agree to your house rules before they book.
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        {/* TODO: review if needed */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            General amenities
          </label>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("Smoking", "Do", "Do not allow")}
            {renderRadio("Smoking", "Allow", "Allow", true)}
            {renderRadio("Smoking", "Charge", "Charge")}
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Pet
          </label>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("Pet", "Do", "Do not allow")}
            {renderRadio("Pet", "Allow", "Allow", true)}
            {renderRadio("Pet", "Charge", "Charge")}
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Party organizing
          </label>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("Partyorganizing", "Do", "Do not allow")}
            {renderRadio("Partyorganizing", "Allow", "Allow", true)}
            {renderRadio("Partyorganizing", "Charge", "Charge")}
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Cooking
          </label>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {renderRadio("Cooking", "Do", "Do not allow")}
            {renderRadio("Cooking", "Allow", "Allow", true)}
            {renderRadio("Cooking", "Charge", "Charge")}
          </div>
        </div>

        {/* ----------- */}
        <div className=" border-b border-neutral-200 dark:border-neutral-700"></div>
        <span className="block text-lg font-semibold">Additional rules</span>
        <div className="flow-root">
          <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
            {additionalRules.map((rule, index) => renderNoInclude(rule, index))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-5">
          <Input
            className="!h-full"
            placeholder="No smoking..."
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
          />
          <ButtonPrimary className="flex-shrink-0" onClick={handleAddRule}>
            <i className="text-xl las la-plus"></i>
            <span className="ml-3">Add Rule</span>
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default PageAddListing5;

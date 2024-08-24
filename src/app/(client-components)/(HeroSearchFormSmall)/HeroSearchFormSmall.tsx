"use client";

import React, { FC, useEffect, useState } from "react";
import { StaySearchFormFields } from "../../../interfaces/guest.interface";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";

export interface HeroSearchFormSmallProps {
  className?: string;
  defaultFieldFocus?: StaySearchFormFields;
}

const HeroSearchFormSmall: FC<HeroSearchFormSmallProps> = ({
  className = "",
  defaultFieldFocus,
}) => (
  <div
    className={`nc-HeroSearchFormSmall ${className}`}
    data-nc-id="HeroSearchFormSmall"
  >
    <div className="mt-2">
      <StaySearchForm defaultFieldFocus={defaultFieldFocus} />
    </div>
  </div>
);

export default HeroSearchFormSmall;

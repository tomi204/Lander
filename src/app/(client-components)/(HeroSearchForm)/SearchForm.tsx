"use client";

import React, { FC } from "react";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";
import { ApolloWrapper } from "@/contexts/ApolloProvider";

export type SearchTab = "Stays";

export interface SearchFormProps {
  className?: string;
}

const SearchForm: FC<SearchFormProps> = ({ className = "" }) => (
  <div className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}>
    <ApolloWrapper>
      <StaySearchForm />
    </ApolloWrapper>
  </div>
);

export default SearchForm;

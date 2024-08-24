import { Stay } from "@/data/types";
import { StrapiPaginatedResult } from "@/interfaces/StrapiPaginatedResults";
import { AxiosResponse } from "axios";
import type { ApolloQueryResult } from "@apollo/client/core";
import { GraphQLStayResponse } from "@/interfaces/Stay";

export const covertToStays = (
  res: AxiosResponse<StrapiPaginatedResult<Stay>>
): Stay[] => {
  return res.data.data.map(({ id, attributes }) => ({
    ...attributes,
    id,
  }));
};

export const covertApolloResponseToStays = (
  res: ApolloQueryResult<GraphQLStayResponse>
): Stay[] => {
  return res.data.stays.data.map(({ id, attributes }) => ({
    ...attributes,
    id,
  }));
};

export const covertApolloResponseToLocations = (
  data: GraphQLStayResponse
): string[] => {
  return data.stays.data.map(({ attributes }) => attributes.address);
};

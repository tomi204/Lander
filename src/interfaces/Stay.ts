import { Stay } from "@/data/types";
import { StrapiPaginatedResult } from "./StrapiPaginatedResults";

export type GraphQLStayResponse = {
  stays: StrapiPaginatedResult<Stay>;
};

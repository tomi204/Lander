import { Stay } from "@/data/types";
import { StrapiPaginatedResult } from "@/interfaces/StrapiPaginatedResults";
import { serverAxiosInstance } from "./axios/instanceServer";
import { StrapiData } from "@/interfaces/Strapi";
import { extractData } from "@/utils/strapiParser";
import { AxiosPromise } from "axios";
import { covertToStays } from "@/adapters/stay.adapters";

export const findListings = async (
  params: Record<string, any>
): Promise<Stay[]> => {
  const res = await serverAxiosInstance.get<StrapiPaginatedResult<Stay>>(
    "/api/stays",
    {
      withCredentials: true,
      params,
    }
  );
  return covertToStays(res);
};

export const findUserListingsSSR = async (
  token: string,
  params?: Record<string, any>
) => {
  return serverAxiosInstance.get<StrapiPaginatedResult<Stay>>("/api/stays/me", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findStayById = async (id: string): Promise<Stay> => {
  const res = await serverAxiosInstance.get<StrapiData<Stay>>(
    `/api/stays/${id}?populate=*`,
    {
      withCredentials: true,
    }
  );

  return extractData(res) as Stay;
};

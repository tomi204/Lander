import { Country } from "@/data/types";
import { StrapiPaginatedResult } from "@/interfaces/StrapiPaginatedResults";
import { serverAxiosInstance } from "./axios/instanceServer";
import { StrapiData } from "@/interfaces/Strapi";
import { extractData } from "@/utils/strapiParser";

export const findCountries = async (
  params?: Record<string, any>
): Promise<Country[]> => {
  const res = await serverAxiosInstance.get<StrapiPaginatedResult<Country>>(
    "/api/countries?pagination[withCount]=true&populate=*&pagination[limit]=100",
    {
      withCredentials: true,
      params,
    }
  );

  return res.data.data.map(({ id, attributes }) => ({
    ...attributes,
    id,
  }));
};

export const findCountryById = async (id: string): Promise<Country> => {
  const res = await serverAxiosInstance.get<StrapiData<Country>>(
    `/api/countries/${id}?populate=*`,
    {
      withCredentials: true,
    }
  );

  return extractData(res) as Country;
};

import { TaxonomyType } from "@/data/types";
import { StrapiPaginatedResult } from "@/interfaces/StrapiPaginatedResults";
import { serverAxiosInstance } from "./axios/instanceServer";
import { StrapiData } from "@/interfaces/Strapi";
import { extractData } from "@/utils/strapiParser";

export const findTaxonomies = async (
  params?: Record<string, any>
): Promise<TaxonomyType[]> => {
  const res = await serverAxiosInstance.get<
    StrapiPaginatedResult<TaxonomyType>
  >(
    "/api/taxonomy-tpes?pagination[withCount]=true&populate=*&pagination[limit]=100",
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

export const findTaxonomyById = async (id: string): Promise<TaxonomyType> => {
  const res = await serverAxiosInstance.get<StrapiData<TaxonomyType>>(
    `/api/taxonomy-tpes/${id}?populate=*`,
    {
      withCredentials: true,
    }
  );

  return extractData(res) as TaxonomyType;
};

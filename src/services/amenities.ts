import { Amenity } from "@/data/types";
import { StrapiPaginatedResult } from "@/interfaces/StrapiPaginatedResults";
import { serverAxiosInstance } from "./axios/instanceServer";
import { StrapiData } from "@/interfaces/Strapi";
import { extractData } from "@/utils/strapiParser";

export const findAmenities = async (
  params?: Record<string, any>
): Promise<Amenity[]> => {
  const res = await serverAxiosInstance.get<StrapiPaginatedResult<Amenity>>(
    "/api/amenities?pagination[withCount]=true&populate=*&pagination[limit]=100",
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

export const findAmenityById = async (id: string): Promise<Amenity> => {
  const res = await serverAxiosInstance.get<StrapiData<Amenity>>(
    `/api/amenities/${id}?populate=*`,
    {
      withCredentials: true,
    }
  );

  return extractData(res) as Amenity;
};

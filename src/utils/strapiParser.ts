import { StrapiData } from "@/interfaces/Strapi";
import { AxiosResponse } from "axios";

export function extractData<T>(res: AxiosResponse<StrapiData<T>>): T[] | T {
  const data = res.data;
  return Array.isArray(data)
    ? data.map((item) => {
        return {
          ...item.attributes,
          id: item.id,
        };
      })
    : {
        ...data.data.attributes,
        id: data.data.id,
      };
}

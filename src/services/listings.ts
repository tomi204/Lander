import { Stay } from "@/data/types";
import { StrapiPaginatedResult } from "@/interfaces/StrapiPaginatedResults";
import { serverAxiosInstance } from "./axios/instanceServer";
import { StrapiData } from "@/interfaces/Strapi";
import { extractData } from "@/utils/strapiParser";
import { AxiosPromise } from "axios";
import { covertToStays } from "@/adapters/stay.adapters";
import supabase from '@/supabase/client';
import { cache } from 'react';


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

export const findPropertyById = cache(async (id: string): Promise<Stay> => {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      owner:owner_id (
        id,
        name,
        email,
        wallet
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  } else {
    console.log(data)
  }

  return data;
});


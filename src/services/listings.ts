import { Stay } from '@/data/types';
import { StrapiPaginatedResult } from '@/interfaces/StrapiPaginatedResults';
import { serverAxiosInstance } from './axios/instanceServer';
import { StrapiData } from '@/interfaces/Strapi';
import { extractData } from '@/utils/strapiParser';
import { AxiosPromise } from 'axios';
import { covertToStays } from '@/adapters/stay.adapters';
import supabase from '@/utils/supabase/client';
import { cache } from 'react';

export const findListings = async (
  params: Record<string, any>
): Promise<Stay[]> => {
  const res = await serverAxiosInstance.get<StrapiPaginatedResult<Stay>>(
    '/api/stays',
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
  return serverAxiosInstance.get<StrapiPaginatedResult<Stay>>('/api/stays/me', {
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
    .select(
      `
      *
    `
    )
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // If owner is null, fetch the user separately using owner_id
  if (!data.owner && data.owner_id) {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, name, email, wallet_evm, wallet_sol')
      .eq('id', data.owner_id)
      .single();

    if (userError) {
      console.warn(
        `Failed to fetch owner for property ${id}: ${userError.message}`
      );
    } else {
      console.log(userData, 'userData');
      data.owner = userData;
    }
  }

  // If owner is still null, set default values
  if (!data.owner) {
    console.warn(`Owner not found for property with id: ${id}`);
    data.owner = {
      id: data.owner_id || null,
      name: 'Unknown',
      email: null,
      wallet_evm: data.wallet_owner || null,
      wallet_sol: null,
    };
  }

  return data;
});

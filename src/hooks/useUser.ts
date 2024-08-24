"use client";

import { User } from "@/data/types";
import { serverAxiosInstance } from "@/services/axios/instanceServer";
import { makeUseAxios } from "axios-hooks";

const useAxios = makeUseAxios({ axios: serverAxiosInstance });

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "";

function useUserData(address?: string) {
  return useAxios<User, unknown>(
    {
      url: `${BASE_URL}/api/users/me`,
      method: "GET",
    },
    { manual: true }
  );
}

function useEditUserData(address?: string) {
  return useAxios<Partial<User>, unknown>(
    {
      url: `${BASE_URL}/api/user/me/update`,
      method: "PUT",
    },
    { manual: true }
  );
}

export { useUserData, useEditUserData };

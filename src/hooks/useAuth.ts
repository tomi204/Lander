import { AuthTokenChallenge, LoginResponse } from "@/interfaces/Auth";
import { serverAxiosInstance } from "@/services/axios/instanceServer";
import { makeUseAxios } from "axios-hooks";

const useAxios = makeUseAxios({ axios: serverAxiosInstance });

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "";

function useTokenChallenge(address?: string) {
  return useAxios<AuthTokenChallenge, unknown>(
    {
      url: `${BASE_URL}/webthree-auth/token/${address}`,
      method: "GET",
    },
    { manual: true }
  );
}

function useAuthWithToken(payload: { address?: string; signature?: string }) {
  return useAxios<LoginResponse, unknown>(
    {
      method: "GET",
      url: `${BASE_URL}/webthree-auth/authenticate/${payload?.address}/${payload?.signature}`,
    },
    { manual: true }
  );
}

export { useTokenChallenge, useAuthWithToken };

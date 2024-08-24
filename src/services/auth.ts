import { AuthTokenChallenge, LoginResponse } from "@/interfaces/Auth";
import { serverAxiosInstance } from "./axios/instanceServer";

export const authenticate = async (payload: {
  address?: string;
  signature?: string;
}): Promise<LoginResponse> => {
  const res = await serverAxiosInstance.get<LoginResponse>(
    `/webthree-auth/authenticate/${payload?.address}/${payload?.signature}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const getChallenge = async (
  address?: string
): Promise<AuthTokenChallenge> => {
  const res = await serverAxiosInstance.get<AuthTokenChallenge>(
    `/webthree-auth/token/${address}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

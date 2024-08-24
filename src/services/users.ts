import { User } from "@/data/types";
import { serverAxiosInstance } from "./axios/instanceServer";

export const getUserDataSSR = async (token: string) => {
  return serverAxiosInstance.get<User>("/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserData = async () => {
  return serverAxiosInstance.get<User>("/api/users/me", {
    withCredentials: true,
  });
};

import { serverAxiosInstance } from "./axios/instanceServer";
import { VirtualAccount } from "@/interfaces/account.interface";

export const getVirtualAccountSSR = async (token: string) => {
  return serverAxiosInstance.get<VirtualAccount>("/api/virtual-accounts/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

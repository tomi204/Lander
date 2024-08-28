import { serverAxiosInstance } from "./axios/instanceServer";
import { VirtualAccount } from "@/interfaces/account.interface";
import supabase from '@/supabase/client';


export async function fetchUserByTxAndWallet(
  transactionId: string,
  wallet: string
) {
  const response = await fetch(
    `/api/transaction/buyer?transactionId=${transactionId}&wallet=${wallet}`
  );
  const data = await response.json();

  if (response.ok) {
    console.log('User Data:', data);
    return data;
  } else {
    console.error('Error:', data.error);
    throw new Error(data.error);
  }
}


export const getVirtualAccountSSR = async (token: string) => {
  return serverAxiosInstance.get<VirtualAccount>("/api/virtual-accounts/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};







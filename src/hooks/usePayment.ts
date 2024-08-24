import { FeeTransactionEstimation, Payment } from "@/interfaces/Payment";
import { StrapiData } from "@/interfaces/Strapi";
import { serverAxiosInstance } from "@/services/axios/instanceServer";
import { makeUseAxios } from "axios-hooks";

const useAxios = makeUseAxios({ axios: serverAxiosInstance });

function usePaymentUpdate(id: string) {
  return useAxios<StrapiData<Partial<Payment>>>(
    {
      url: `${process.env.NEXT_PUBLIC_URL}/api/payments/${id}`,
      method: "PUT",
      withCredentials: true,
    },
    { manual: true }
  );
}

function useGetRecommendedFees(id: string) {
  return useAxios<FeeTransactionEstimation>(
    {
      url: `${process.env.NEXT_PUBLIC_URL}/api/payments/${id}/blockchain/fees`,
      method: "GET",
      withCredentials: true,
    },
    { manual: false }
  );
}

function usePaymentMediation(id: string) {
  return useAxios<FeeTransactionEstimation>(
    {
      url: `${process.env.NEXT_PUBLIC_URL}/api/payments/${id}/claim`,
      method: "PUT",
      withCredentials: true,
    },
    { manual: true }
  );
}

export { usePaymentUpdate, useGetRecommendedFees, usePaymentMediation };

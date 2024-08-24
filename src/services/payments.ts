import { serverAxiosInstance } from "./axios/instanceServer";

import { FeeTransactionEstimation } from "@/interfaces/Payment";

export const getRecommendedFees = async (
  id: string
): Promise<FeeTransactionEstimation> => {
  const res = await serverAxiosInstance.get<FeeTransactionEstimation>(
    `/api/payments/${id}/blockchain/fees`,
    {
      withCredentials: true,
    }
  );

  return res.data;
};

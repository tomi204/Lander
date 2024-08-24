import { Stay } from "@/data/types";
import { StrapiData } from "@/interfaces/Strapi";
import { serverAxiosInstance } from "@/services/axios/instanceServer";
import { makeUseAxios } from "axios-hooks";

const useAxios = makeUseAxios({ axios: serverAxiosInstance });

function useCreateStay() {
  return useAxios<StrapiData<Stay>>(
    {
      url: `${process.env.NEXT_PUBLIC_URL}/api/stays`,
      method: "POST",
      withCredentials: true,
    },
    { manual: true }
  );
}

export default useCreateStay;

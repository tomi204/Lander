import { Stay } from "@/data/types";
import { BookResponse, BookingRequest } from "@/interfaces/Booking";
import { StrapiData } from "@/interfaces/Strapi";
import { serverAxiosInstance } from "@/services/axios/instanceServer";
import { makeUseAxios } from "axios-hooks";

const useAxios = makeUseAxios({ axios: serverAxiosInstance });

function useCreateBooking() {
  return useAxios<BookResponse>(
    {
      url: `${process.env.NEXT_PUBLIC_URL}/api/books`,
      method: "POST",
      withCredentials: true,
    },
    { manual: true }
  );
}

export { useCreateBooking };

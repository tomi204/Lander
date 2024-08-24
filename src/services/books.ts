import { Stay } from "@/data/types";
import { StrapiPaginatedResult } from "@/interfaces/StrapiPaginatedResults";
import { serverAxiosInstance } from "./axios/instanceServer";
import { StrapiData } from "@/interfaces/Strapi";
import { extractData } from "@/utils/strapiParser";
import { Book, BookResponse } from "@/interfaces/Booking";

export const findUsersBookingsSSR = async (
  token: string,
  params?: Record<string, any>
) => {
  return serverAxiosInstance.get<StrapiPaginatedResult<Book>>("/api/books/me", {
    withCredentials: true,
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findHostBookingsSSR = async (
  token: string,
  params?: Record<string, any>
) => {
  return serverAxiosInstance.get<StrapiPaginatedResult<Book>>(
    "/api/books/host",
    {
      withCredentials: true,
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const findBookById = async (
  id: string,
  token: string
): Promise<Book> => {
  const res = await serverAxiosInstance.get<BookResponse>(
    `/api/books/${id}?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );

  return extractData(res) as Book;
};

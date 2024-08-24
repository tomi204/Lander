import { Stay, User } from "@/data/types";
import { Payment, PaymentMetadata } from "./Payment";
import { StrapiData } from "./Strapi";

export type BookingRequest = StrapiData<BookingPayload>;

export interface BookingPayload {
  host: string;
  stay: string;
  from: string;
  to: string;
  guestAddress: string;
  guestAdults: number;
  guestChildren: number;
  guestInfants: number;
}

export type BookResponse = StrapiData<Book>;

export interface Book {
  id: string;
  from: string;
  to: string;
  priceNight: number;
  total: number;
  guestAdults: number;
  guestChildren: number;
  guestInfants: number;
  guestAddress: string;
  createdAt: Date;
  updatedAt: Date;
  stay: StrapiData<Stay>;
  host: StrapiData<User>;
  payment: StrapiData<Payment, PaymentMetadata>;
  nights: number;
}

import { StrapiData, Media, MediaMultiple } from "@/interfaces/Strapi";
import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route<string> | string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string;
  name: string;
  href: Route<string>;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "stay" | "experiences" | "car";
}

export interface User {
  id: string | number;
  username: string;
  addressWallet: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: StrapiData<Media>;
  bgImage?: StrapiData<Media>;
  email?: string;
  desc: string;
  starRating?: number;
  about?: string;
  phoneNumber?: string;
}

export interface PostDataType {
  id: string | number;
  author: User;
  date: string;
  href: Route<string>;
  categories: TaxonomyType[];
  title: string;
  featuredImage: StaticImageData | string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//
export interface Stay {
  id: string;
  author: StrapiData<User>;
  date: string;
  href: Route<string>;
  name: string;
  featuredImage: StrapiData<Media>[];
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: MediaMultiple;
  price: number;
  listingCategory: StrapiData<TaxonomyType>;
  maxGuests: number;
  kitchens: number;
  beds: number;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  lat: number;
  lng: number;
  description: string;
  acreage: number;
  excludeDates?: string[];
  reservedDates?: string[];
  nightStayMin?: Date;
  nightStayMax?: Date;
  availableTo?: string;
  availableFrom?: string;
  cleaningServiceFee?: number;
  depositAmount?: number;
}

export interface Country {
  id: string;
  name: string;
  iso: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
}
export interface Amenity {
  id: string;
  name: string;
  label: string;
  type: "general" | "other" | "safe";
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
}

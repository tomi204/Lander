export interface StayPayloadRequest {
  name: string;
  address: string;
  date: Date;
  href: string;
  commentCount: number;
  viewCount: number;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  featuredImage: string;
  price: number;
  guarantyPrice: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff: number;
  isAds: boolean;
  lat: string;
  lng: string;
  listingCategory: string;
  author: string;
  excludeDates: string[];
  description: string;
  rentalForm: RentalForm;
  beds: number;
  kitchens: number;
  acreage: number;
  locale: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  preferredCoin: string;
  nightStayMin: number;
  nightStayMax: number;
  availableFrom: Date;
  availableTo: Date;
  cleaningServiceFee: number;
}

export interface StayDates {
  id?: number;
  timestamp: number;
}

export enum RentalForm {
  entire = "entire",
  private = "private",
  share = "share",
}

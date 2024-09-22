import React, { FC } from "react";
import { Star, Bed, Bath, Wifi, Car } from 'lucide-react';
import GallerySlider from "@/components/GallerySlider";
import { Stay } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import { Badge as Label} from '@/components/ui/badge';
import Badge from "@/shared/Badge";
import Link from "next/link";
import Image from "next/image";
export interface StayCard2Props {
  className?: string;
  data: Stay;
  size?: "default" | "small";
}

const StayCard2: FC<StayCard2Props> = ({
  size = "default",
  className = "",
  data,
}) => {
  const {
    main_image,
    bathrooms,
    description,
    galleryImgs,
    address,
    name,
    bedrooms,
    like,
    title,
    saleOff,
    isAds,
    price,
    reviewStart,
    reviewCount,
    id,
    type,
    beds,
    location

  } = data;

  

  const listingCategory = data?.listingCategory?.data?.attributes;


  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        {/* <GallerySlider
          uniqueID={`StayCard2_${id}`}
          ratioClass="aspect-w-12 aspect-h-11"
          galleryImgs={galleryImgs}
          imageClass="rounded-lg"
          href={`/stay/detail/${data.id}`}
        /> */}
        <Image
        width={500}
        height={400}
          alt={'Gallery Image'}
          src= {main_image || 'Gallery Image'} // Assuming galleryImgs may have an 'alt' property
          className="rounded-lg w-full"
        />


        {/* TODO: Implement later */}
        {/* <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" /> */}
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === 'default' ? 'mt-3 space-y-3' : 'mt-2 space-y-2'}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            {isAds && <Badge name="ADS" color="green" />}
            <h2
              className={`font-semibold capitalize  tracking-wide text-indigo-500  dark:text-white ${
                size === 'default' ? 'text-base' : 'text-base'
              }`}
            >
              {title}

              {/* <span className="line-clamp-1">{description}</span> */}
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            {size === 'default' && (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="">{location}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">4.0 (128 reviews)</span>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Bed className="h-4 w-4 mr-1" />
          <span className="mr-2">{beds}</span>
          <Bath className="h-4 w-4 mr-1" />
          <span className="mr-2">{bathrooms}</span>
          <Wifi className="h-4 w-4 mr-1" />
          <span className="mr-2">Wifi</span>
          {/* <Car className="h-4 w-4 mr-1" />
          <span>Free parking</span> */}
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {price}
            {` `}
            {size === 'default' && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal mr-10">
                /night
              </span>
            )}
          </span>
          <Label variant="default" className="text-sm mr-15">
            {type}
          </Label>
          {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-StayCard2 group relative ${className}`}>
      {renderSliderGallery()}
      <Link href={`/stay/detail/${data.id}`}>{renderContent()}</Link>
    </div>
  );
};

export default StayCard2;

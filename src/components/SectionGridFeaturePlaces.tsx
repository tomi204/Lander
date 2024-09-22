import React, { FC, ReactNode } from "react";
import { Stay } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";

export interface SectionGridFeaturePlacesProps {
  stayListings?: Stay[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
  properties?: any;
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  properties,
  stayListings = [],
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that CryptoBed recommends for you",
  headingIsCenter,
  tabs = ["New York", "Tokyo", "Paris", "London"],
  cardType = "card2",
}) => {
  const renderCard = (stay: Stay) => {
    let CardName = StayCard;
    switch (cardType) {
      case "card1":
        CardName = StayCard;
        break;
      case "card2":
        CardName = StayCard2;
        break;

      default:
        CardName = StayCard;
    }

    return <CardName key={stay.id} data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={'New York'}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {properties.map((stay:any) => renderCard(stay))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;

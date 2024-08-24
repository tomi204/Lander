import React from "react";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import { Stay } from "@/data/types";

import SectionGridHasMap from "./listing/SectionGridHasMap";
import SectionHeroArchivePage from "./(server-components)/SectionHeroArchivePage";
import CryptoBedSeo from "@/constants/seo";
import { Metadata } from "next";
import { gql } from "@apollo/client";
import { getClient } from "@/utils/apollo";
import { homeSettingsConst } from "@/constants/home";
import { covertApolloResponseToStays } from "@/adapters/stay.adapters";

export const revalidate = 2;

const query = gql`
  query StaysHome($address: String, $guests: Int) {
    stays(
      filters: { address: { containsi: $address }, maxGuests: { gte: $guests } }
      pagination: { page: 1, pageSize: 100 }
    ) {
      data {
        id
        attributes {
          price
          name
          address
          maxGuests
          listingCategory {
            data {
              id
              attributes {
                name
              }
            }
          }
          galleryImgs {
            data {
              attributes {
                url
                formats
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;

interface PageHomeProps {
  searchParams: {
    location: string;
    from: string;
    to: string;
    guests: string;
  };
}

export const metadata: Metadata = CryptoBedSeo;

async function PageHome({ searchParams }: PageHomeProps) {
  let items: Stay[] = [];

  const settings = homeSettingsConst["DEFAULT"];
  const client = getClient();

  try {
    const res = await client.query({
      query,
      variables: { address: searchParams.location, guests: searchParams.guests },
    });

    items = covertApolloResponseToStays(res);
  } catch (error) {
    console.log("error", error);
  }

  return (
    <main className="relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-8 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        {/* <SectionHome className="pt-10 lg:pt-16 lg:pb-16" /> */}

        <div className="container pt-10 pb-0">
          <SectionHeroArchivePage settings={settings} />
        </div>

        <div className="w-full ">
          <h2 className="font-medium text-4xl md:text-5xl leading-[110%] pb-2 md:pb-10">Stays</h2>
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
        </div>
        {/* List Stays */}
        <SectionGridHasMap items={items} />
        {/* SECTION 1 */}
        {/* <SectionSliderNewCategories categories={DEMO_CATS} /> */}

        {/* <SectionOurFeatures />

        <SectionGridFeaturePlaces cardType="card2" /> */}

        {/* <SectionHowItWork /> */}

        {/* <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black/20" />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType="card4"
            itemPerRow={4}
            heading="Suggestions for discovery"
            subHeading="Popular places to stay that Chisfis recommends for you"
            sliderStyle="style2"
          />
        </div> */}

        {/* <SectionSubscribe2 /> */}

        {/* <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div> */}

        {/* <SectionGridCategoryBox /> */}

        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div> */}

        {/* <SectionSliderNewCategories
          heading="Explore by types of stays"
          subHeading="Explore houses based on 10 types of stays"
          categoryCardType="card5"
          itemPerRow={5}
        /> */}

        {/* <SectionVideos /> */}

        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div> */}
      </div>
    </main>
  );
}

export default PageHome;

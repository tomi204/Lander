import BgGlassmorphism from '@/components/BgGlassmorphism';
import { Stay } from '@/data/types';
import React from 'react';
import SectionGridHasMap from './listing/SectionGridHasMap';
import SectionHeroArchivePage from './(server-components)/SectionHeroArchivePage';
import CryptoBedSeo from '@/constants/seo';
import { Metadata } from 'next';
import { homeSettingsConst } from '@/constants/home';
import { createClient } from '@/supabase/server';
import SectionOurFeatures from '@/components/SectionOurFeatures';
import SectionSubscribe2 from '@/components/SectionSubscribe2';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const revalidate = 2;

export const metadata: Metadata = CryptoBedSeo;

async function PageHome() {
  let items: Stay[] = [];

  const supabase = createClient();
  const { data: properties } = await supabase.from('properties').select();

  const { data: users } = await supabase.from('users').select();

  const settings = homeSettingsConst['DEFAULT'];

  if (!properties) return <LoadingSpinner />;

  return (
    <main className="relative overflow-hidden">
      <BgGlassmorphism />

      <div className="container relative space-y-8 mb-24 lg:space-y-28 lg:mb-28">
        <div className="container pt-10 pb-0">
          <SectionHeroArchivePage settings={settings} />
        </div>

        <div className="w-full ">
          <h2 className="font-medium text-4xl md:text-5xl leading-[110%] pb-2 md:pb-10">
            Stays
          </h2>
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
        </div>
        <SectionGridHasMap items={items} properties={properties} />

        <SectionOurFeatures />

        <SectionSubscribe2 />
      </div>
    </main>
  );
}

export default PageHome;

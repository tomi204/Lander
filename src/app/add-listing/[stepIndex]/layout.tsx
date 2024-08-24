"use client";

import { FC } from "react";
import { StayProvider } from "@/contexts/StayProvider";

export interface CommonLayoutProps {
  children: React.ReactNode;
  params: {
    stepIndex: string;
  };
}

const CommonLayout: FC<CommonLayoutProps> = ({ children, params }) => {
  const index = Number(params.stepIndex) || 1;

  return (
    <StayProvider>
      <div
        className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 sm:pb-0 pt-14 sm:pt-0 sm:py-24 lg:pb-32`}
      >
        <div className="space-y-11">
          <div>
            <span className="text-4xl font-semibold">{index}</span>{" "}
            <span className="text-lg text-neutral-500 dark:text-neutral-400">/ 8</span>
          </div>

          <div className="listingSection__wrap ">{children}</div>
        </div>
      </div>
    </StayProvider>
  );
};

export default CommonLayout;

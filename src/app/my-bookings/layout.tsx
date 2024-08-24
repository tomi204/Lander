"use client";
import React, { FC } from "react";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className="nc-CommonLayoutAccount bg-neutral-50 dark:bg-neutral-900">
      <div className="md:container pt-14 sm:pt-4 pb-14">{children}</div>
    </div>
  );
};

export default CommonLayout;

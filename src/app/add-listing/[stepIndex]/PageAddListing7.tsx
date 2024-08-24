"use client";
import FileUploader from "@/components/FileUploader";
import React, { FC } from "react";
import { PageAddListingProps } from "./StepsContainer";
import styled from "styled-components";
import { Media } from "@/interfaces/Strapi";

const InputHidden = styled.input`
  display: none;
`;

const PageAddListing7: FC<PageAddListingProps> = ({ setValue }) => {
  const handleCoverImageUpload = (data: Media[]) => {
    setValue("featuredImage", data[0].id);
  };

  const handleAdditionalImagesUpload = (data: Media[]) => {
    setValue(
      "galleryImgs",
      data.map((file) => file.id)
    );
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Pictures of the place</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          A few beautiful photos will help customers have more sympathy for your
          property.
        </span>
      </div>

      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* ----------------- */}
      <FileUploader
        id="file-upload-1"
        label="Cover image"
        onUpload={handleCoverImageUpload}
      />
      <FileUploader
        id="file-upload-2"
        label="Pictures of the place"
        multiple
        onUpload={handleAdditionalImagesUpload}
      />
    </>
  );
};

export default PageAddListing7;

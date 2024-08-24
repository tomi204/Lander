import React, { FC } from "react";
import Textarea from "@/shared/Textarea";
import { PageAddListingProps } from "./StepsContainer";

const PageAddListing6: FC<PageAddListingProps> = ({ register }) => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">
          Your place description for client
        </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Mention the best features of your accommodation, any special amenities
          like fast Wi-Fi or parking, as well as things you like about the
          neighborhood.
        </span>
      </div>
      <Textarea
        placeholder="..."
        rows={14}
        {...register("description", { required: true })}
      />
    </>
  );
};

export default PageAddListing6;

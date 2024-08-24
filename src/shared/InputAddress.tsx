import React, { InputHTMLAttributes } from "react";
import Autocomplete from "react-google-autocomplete";

export interface InputAddressProps
  extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  country?: string;
  onPlaceSelected?: (place: any) => void;
}

// eslint-disable-next-line react/display-name
const InputAddress = React.forwardRef<HTMLInputElement, InputAddressProps>(
  (
    {
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-2xl",
      country = "ar",
      onPlaceSelected,
      ...args
    },
    ref
  ) => {
    return (
      <Autocomplete
        ref={ref}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${rounded} ${fontClass} ${sizeClass} `}
        onPlaceSelected={onPlaceSelected}
        options={{
          fields: [
            "address_components",
            "geometry.location",
            "formatted_address",
          ],
          types: ["address"],
          componentRestrictions: { country },
        }}
        defaultValue={args.value}
        placeholder="Enter your stay address"
        {...args}
      />
    );
  }
);

export default InputAddress;

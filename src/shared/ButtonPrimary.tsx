import React, { forwardRef, ForwardRefRenderFunction } from "react";
import Button, { ButtonProps } from "./Button";

const ButtonPrimary: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = ({ className = "", ...args }, ref) => {
  return (
    <Button
      ref={ref}
      className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 ${className}`}
      {...args}
    />
  );
};

export default forwardRef(ButtonPrimary);

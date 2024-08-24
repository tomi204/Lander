"use client";

import Label from "@/components/Label";
import { User } from "@/data/types";
import { useEditUserData } from "@/hooks/useUser";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import { FC } from "react";
import { useForm } from "react-hook-form";

export interface AccountContainerProps {
  user: Partial<User>;
}

export interface AccountDataRequest {
  email: string;
  phoneNumber: string;
  about: string;
}

const AccountContainer: FC<AccountContainerProps> = ({ user }) => {
  const [{ data, loading, error }, execute] = useEditUserData();

  const { register, handleSubmit } = useForm<Partial<AccountDataRequest>>({
    values: { ...user } as Partial<User>,
  });

  const checkKeyDown = (e: any) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const onSubmit = (data: Partial<AccountDataRequest>) => {
    execute({
      data,
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={checkKeyDown}>
        {/* HEADING */}
        <h2 className="text-3xl font-semibold sm:hidden">Account Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mt-4 sm:hidden"></div>
        <div className="flex flex-col md:flex-row pt-10 sm:pt-2">
          <div className="flex-grow md:mt-0 md:pl-16 max-w-3xl space-y-6">
            <div>
              <Label>Email</Label>
              <Input
                className="mt-1.5"
                placeholder="add your mail"
                {...register("email", { required: false })}
              />
            </div>
            {/* ---- */}
            <div>
              <Label>Phone Number</Label>
              <Input
                className="mt-1.5"
                placeholder="example: +549123123123"
                {...register("phoneNumber", { required: false })}
              />
            </div>
            <div>
              <Label>About you</Label>
              <Textarea className="mt-1.5" {...register("about", { required: false })} />
            </div>
            <div className="pt-2">
              <ButtonPrimary loading={loading} disabled={loading}>
                Update info
              </ButtonPrimary>
            </div>
            <div className="text-center">
              <div className="text-red-700 px-4 py-3 rounded relative" role="alert">
                {error?.message ? "Ops! Someone is not ok." : null}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountContainer;

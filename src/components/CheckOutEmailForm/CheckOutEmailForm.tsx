import { useEditUserData } from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import { User } from "@/data/types";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { AccountDataRequest } from "@/app/(account-pages)/profile/AccountContainer";
import { useEffect } from "react";

interface CheckOutEmailFormProps {
  email?: string;
  phoneNumber?: string;
  onFormStateChange: (isValid: boolean) => void;
}

const CheckOutEmailForm = ({ email, phoneNumber, onFormStateChange }: CheckOutEmailFormProps) => {
  const [{ loading, error }, execute] = useEditUserData();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Partial<AccountDataRequest>>({
    values: { email, phoneNumber } as Partial<User>,
  });

  const onSubmit = (data: Partial<AccountDataRequest>) => {
    execute({
      data,
    });
  };

  useEffect(() => {
    onFormStateChange && onFormStateChange(isValid);
  }, [isValid]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* HEADING */}
        <div className="flex flex-col md:flex-row sm:pt-2">
          <div className="flex-grow md:mt-0 max-w-3xl space-y-6">
            <div>
              <Label>Email</Label>
              <Input
                className="mt-1.5"
                placeholder="add your mail"
                type="email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "invalid email address",
                  },
                })}
              />
            </div>
            {/* ---- */}
            <div>
              <Label>Phone Number (optional)</Label>
              <Input
                className="mt-1.5"
                placeholder="example: +549123123123"
                {...register("phoneNumber", {
                  required: false,
                })}
              />
            </div>
            <div className="text-xs pt-1 lg:text-sm">
              These changes will affect your profile data.
            </div>
            <div className="pt-2">
              <ButtonPrimary
                type="submit"
                loading={loading}
                disabled={loading}
                className="sm:w-full"
              >
                {email ? "Please add your email" : "Update contact data"}
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

export default CheckOutEmailForm;

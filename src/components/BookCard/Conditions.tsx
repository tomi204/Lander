import {
  DepositGuarantyReleaseStatusMessages,
  PaymentReleaseStatus,
  PaymentReleaseStatusMessages,
} from "@/interfaces/Payment";
import { FC } from "react";

interface ConditionsProps {
  releaseHostTime: number;
  releaseDepositTime: number;
  releaseStatus: PaymentReleaseStatus;
  releaseDepositStatus: PaymentReleaseStatus;
}

const Conditions: FC<ConditionsProps> = ({
  releaseHostTime,
  releaseDepositTime,
  releaseStatus,
  releaseDepositStatus,
}) => {
  return (
    <>
      <div className="block my-2">
        <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
          Conditions Host
        </span>
      </div>
      <div className="mt-2 mb-2">
        <span className="block text-sm text-neutral-500 dark:text-neutral-400 font-normal">
          Release funds to host {releaseHostTime} hs after check-in.
        </span>
        <span className="block text-sm text-neutral-500 dark:text-neutral-400 font-normal mt-2">
          status:{" "}
          <span className="text-neutral-600">
            {PaymentReleaseStatusMessages[releaseStatus]}
          </span>
        </span>
      </div>
      <div className="w-24 border-b border-neutral-200 dark:border-neutral-200 my-2"></div>
      <div className="block my-2">
        <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
          Conditions Guest
        </span>
      </div>
      <div className="mt-2 mb-2">
        <span className="block text-sm text-neutral-500 dark:text-neutral-400 font-normal">
          Release deposit guaranty to guest {releaseDepositTime} hs after
          check-out.
        </span>
        <span className="block text-sm text-neutral-500 dark:text-neutral-400 font-normal mt-2">
          status:{" "}
          <span className="text-neutral-600">
            {DepositGuarantyReleaseStatusMessages[releaseDepositStatus]}
          </span>
        </span>
      </div>
    </>
  );
};

export default Conditions;

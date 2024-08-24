import { FC } from "react";

interface ReservationPriceProps {
  price: number;
  depositAmount?: number;
  cleaningServiceFee?: number;
  nights: number;
}

const ReservationPrice: FC<ReservationPriceProps> = ({
  price,
  depositAmount = 0,
  cleaningServiceFee = 0,
  nights,
}) => {
  return (
    <div className="flex flex-col space-y-6 lg:space-y-7">
      <div className="flex justify-between">
        <span className="text-3xl font-semibold">
          $ {price}
          <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
            /night
          </span>
        </span>
        {/* <StartRating /> */}
      </div>

      <div className="flex justify-between">
        <span className="text-3s font-semibold">
          Nights:
          <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
            {nights}
          </span>
        </span>
      </div>

      {!!depositAmount && (
        <div className="flex justify-between">
          <span className="text-3s font-semibold">
            Deposit Guaranty:
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              USDT {depositAmount}
            </span>
          </span>
        </div>
      )}

      {!!cleaningServiceFee && (
        <div className="flex justify-between">
          <span className="text-3s font-semibold">
            Cleaning Service:
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              USDT {cleaningServiceFee}
            </span>
          </span>
        </div>
      )}

      <div className="flex justify-between">
        <span className="text-3s font-semibold">
          Total:
          <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
            USDT{" "}
            {Number(
              price * nights + (cleaningServiceFee ?? 0) + (depositAmount ?? 0)
            ).toFixed(2)}
          </span>
        </span>
        {/* <StartRating /> */}
      </div>
    </div>
  );
};

export default ReservationPrice;

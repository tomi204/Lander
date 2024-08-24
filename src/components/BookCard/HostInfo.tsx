import { FC } from "react";
import WalletAddressComponent from "../WalletAddressComponent";

interface HostInfoProps {
  name: string;
  email?: string;
  address: string;
  isReady?: boolean;
}

const HostInfo: FC<HostInfoProps> = ({ name, email = "--", address, isReady }) => {
  return (
    <>
      <div className="block my-4">
        <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">{name}</span>
      </div>
      <div className="block mb-4">
        <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
          Host: <WalletAddressComponent address={address} />
        </span>
      </div>
      <div className="block mb-4">
        <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
          Host Email: {email ?? "--"}
        </span>
      </div>
      {isReady && (
        <>
          <div className="w-50 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
          <div className="block mb-4">
            <span className="text-sm text-neutral-800 dark:text-neutral-400 font-normal">
              Your booking is ready!
            </span>
            <br></br>
            <br></br>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
              The Host will contact you soon through your contact information. Don’t worry if the
              Host has some delay, your funds are blocked until check-in.
            </span>
          </div>
        </>
      )}
      <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-2"></div>
    </>
  );
};

export default HostInfo;

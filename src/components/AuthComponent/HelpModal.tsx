import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";

interface HelpModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const HelpModal: FC<HelpModalProps> = ({ isOpen, onClose }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="text-center">
        <div className="bg-neutral-50 p-6 rounded-lg shadow-md max-w-xl mx-auto mt-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-left">
            Steps to connect
          </h2>
          <ol className="list-decimal pl-5">
            <li className="mb-3 text-neutral-500">
              <span className="font-semibold">{`Connect Your Wallet:`}</span>
              {`Before
              you can proceed, ensure you have Metamask installed and ready.
              Click on the "Connect" button to link your wallet.`}
            </li>
            <li className="mb-3 text-neutral-500">
              <span className="font-semibold">{`Sign to Continue:`}</span>
              {`Once your
              wallet is connected, you'll need to sign a message to authenticate
              and continue. This ensures your security and identity. Click on
              the "Sign to continue" button to do this.`}
            </li>
            <li className="text-neutral-500">
              <span className="font-semibold">{`Check for Messages:`}</span>
              {`If
              there are any issues or further instructions, messages will appear
              below the buttons. Make sure to read them carefully.`}
            </li>
          </ol>
          <p className="mt-4 text-sm text-pink-500 italic">
            {`Remember, always ensure you're connecting to a trusted site and
            never share your private keys.`}
          </p>
        </div>
      </div>
    </Transition>
  );
};

export default HelpModal;

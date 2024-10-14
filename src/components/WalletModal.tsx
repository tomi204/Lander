import { useAppKit } from '@reown/appkit/react';
import Link from 'next/link';
import { Wallet } from 'lucide-react';
export const WalletModal = () => {
  const { open } = useAppKit();
  return (
    <section
      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
      onClick={() => open({ view: 'Account' })}
    >
      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
        <Wallet className="mr-2 h-5 w-5" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium ">Wallet</p>
      </div>
    </section>
  );
};

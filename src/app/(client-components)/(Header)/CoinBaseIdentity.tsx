import WalletAddressComponent from '@/components/WalletAddressComponent';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { Avatar, Identity, Name, Badge } from '@coinbase/onchainkit/identity';
import { useAppKit } from '@reown/appkit/react';
import { Spinner } from '@chakra-ui/react';
export default function CoinBaseIdentity() {
  const { address } = useBlockchain();
  const { open } = useAppKit();
  return (
    <div
      className="m-auto w-7/12 rounded-3xl mr-20"
      onClick={() => {
        open({ view: 'Account' });
      }}
    >
      <Identity
        className="rounded-3xl bg-white"
        address={address as `0x${string}`}
        schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
      >
        <Avatar
          loadingComponent={<Spinner />}
          defaultComponent={
            <div className="h-8 w-8">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="6,1 14,1 19,6 19,14 14,19 6,19 1,14 1,6"
                  fill="green"
                  stroke="green"
                  stroke-width="1"
                />
              </svg>
            </div>
          }
        />
        <Name>
          <Badge />
        </Name>
        <WalletAddressComponent address={address || ''} />
      </Identity>
    </div>
  );
}

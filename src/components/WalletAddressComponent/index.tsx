import React from "react";

interface WalletAddressComponentProps {
  address: string;
}

const WalletAddressComponent: React.FC<WalletAddressComponentProps> = ({ address }) => {
  const obfuscateAddress = (address: string) => {
    const start = address.substring(0, 6);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
  };

  return <>{obfuscateAddress(address)}</>;
};

export default WalletAddressComponent;

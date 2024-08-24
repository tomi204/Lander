import { ContractAddress, coinMap } from "@/constants/internal";
import { useMemo, FC } from "react";

interface CoinSymbolComponentProps {
  contractAddress: ContractAddress;
}

const CoinSymbolComponent: FC<CoinSymbolComponentProps> = ({
  contractAddress,
}) => {
  const name = useMemo(() => coinMap[contractAddress], [contractAddress]);

  return (
    <>
      <span>{name}</span>
    </>
  );
};

export default CoinSymbolComponent;

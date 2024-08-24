export enum AllowedTokens {
  USDT = "USDT",
  dai = "DAI",
}

export type ContractAddress = string;

export const coinMap: Record<ContractAddress, AllowedTokens> = {
  "0xB6434EE024892CBD8e3364048a259Ef779542475": AllowedTokens.USDT,
  "0xdAC17F958D2ee523a2206206994597C13D831ec7": AllowedTokens.USDT,
};

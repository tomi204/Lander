import { CustomError } from "./CustomError";

export enum WalletErrorType {
  UNKNOWN_WALLET_ERROR = "UNKNOWN_ERROR",
  CONNECTION_ERROR = "CONNECTION_ERROR",
  SING_ERROR = "SING_ERROR",
  CONNECTION_REJECTED = "CONNECTION_REJECTED",
  SING_REJECTED = "SING_REJECTED",
  SIGNER_NOT_FOUND = "SIGNER_NOT_FOUND",
  WALLET_CONNECT_SIGNATURE_REJECTED = "WALLET_CONNECT_SIGNATURE_REJECTED",
  WALLET_CONNECT_SIGNATURE_ERROR = "WALLET_CONNECT_SIGNATURE_ERROR",
  WALLET_CONNECT_ERROR = "WALLET_CONNECT_ERROR",
}

export class WalletError extends CustomError {
  type: WalletErrorType = WalletErrorType.UNKNOWN_WALLET_ERROR;

  constructor(
    message: string,
    type: WalletErrorType = WalletErrorType.UNKNOWN_WALLET_ERROR
  ) {
    super(message);
    this.type = type;
  }
}

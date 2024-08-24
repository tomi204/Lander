import { WalletError, WalletErrorType } from "./WalletError";

enum MyAlgoErrorMessages {
  OPERATION_CANCELLED = "Operation cancelled",
}

enum AlgoSignerErrorCodes {
  REQUEST_CANCELLED = 4001,
}
/**
 * Data obtained from Pera Wallet iOS repository
 * https://github.dev/perawallet/pera-wallet/blob/dba7d1ad87b46bfcc00b54018eea4a79bd46a986/ios/Classes/Models/WalletConnect/Transaction/Response/Error/WCTransactionErrorResponse.swift#L31
 */
enum WalletConnectErrorMessages {
  SIGNATURE_REJECTED_BY_USER = "Transaction Request Rejected: The User has rejected the transaction request.",
  WRONG_NETWORK = "Signing Error: Network mismatch between dApp and Wallet. For example, Wallet is connected to TestNet and dApp connected to MainNet (or vice versa).",
  INVALID_ASSET = "Invalid Input: Invalid Asset",
}

export enum CustomErrorWalletMessages {
  WALLET_CONNECT_ERROR = "WalletConnect error.",
  WALLET_CONNECT_SIGNATURE_REJECTED = "Wallet Connect: Challenge signature rejected by user.",
  WALLET_CONNECT_INVALID_NETWORK = "Wallet Connect: Check your network settings in pera wallet.",
  WALLET_CONNECT_ERROR_CONNECTION = "Metamask: connection error.",
  MY_ALGO_CONNECTION_ERROR = "My Algo Connect error.",
  MY_ALGO_OPERATION_CANCELLED = "My Algo operation cancelled.",
  MY_ALGO_OPERATION_REJECTED_BY_USER = "My Algo Connect: connection rejected by user.",
  ALGO_SIGNER_ERROR = "Algosigner error.",
  ALGO_SIGNER_CONNECT_REJECTED_BY_USER = "Algosigner: connection rejected by user.",
  ALGO_SIGNER_SIGNATURE_REJECTED_BY_USER = "Algosigner: Challenge signature rejected by user.",
  METAMASK_ERROR_CONNECTION = "Metamask: connection error.",
  INVALID_CHALLENGE = "Invalid challenge",
  UNSUPPORTED_CHAIN = "Unsupported chain, Please change your wallet network and try again.",
  REQUEST_REJECTED_BY_USER = "Request rejected by user.",
  SIGNATURE_REJECTED_BY_USER = "User denied signature, please try again and accept.",
  SIGNATURE_ERROR = "Signature error.",
  WALLET_ERROR = "Wallet error",
}

export enum EthereumWalletErrorCodes {
  REQUEST_CANCELLED = 4001,
}

export enum EthereumWalletErrorMessages {
  REQUEST_REJECTED_BY_USER = "The user rejected the request",
  WRONG_NETWORK = "Unsupported chain id",
}

export const walletConnectEventsErrorHandler = (error: Error | unknown) => {
  if (!error) {
    return;
  }
  if (
    (error as Error).message ===
    WalletConnectErrorMessages.SIGNATURE_REJECTED_BY_USER
  ) {
    throw new WalletError(
      CustomErrorWalletMessages.WALLET_CONNECT_SIGNATURE_REJECTED,
      WalletErrorType.WALLET_CONNECT_SIGNATURE_REJECTED
    );
  }

  throw new WalletError(
    CustomErrorWalletMessages.WALLET_CONNECT_ERROR,
    WalletErrorType.WALLET_CONNECT_ERROR
  );
};

export const walletConnectErrorHandler = (error: Error | unknown) => {
  const walletError = error as Error;

  switch (walletError.message) {
    case WalletConnectErrorMessages.SIGNATURE_REJECTED_BY_USER:
      throw new WalletError(
        CustomErrorWalletMessages.WALLET_CONNECT_SIGNATURE_REJECTED,
        WalletErrorType.WALLET_CONNECT_SIGNATURE_REJECTED
      );
    case WalletConnectErrorMessages.WRONG_NETWORK:
      throw new WalletError(
        CustomErrorWalletMessages.WALLET_CONNECT_INVALID_NETWORK,
        WalletErrorType.WALLET_CONNECT_SIGNATURE_REJECTED
      );
    case WalletConnectErrorMessages.SIGNATURE_REJECTED_BY_USER:
      throw new WalletError(
        CustomErrorWalletMessages.INVALID_CHALLENGE,
        WalletErrorType.WALLET_CONNECT_SIGNATURE_REJECTED
      );

    default:
      throw new WalletError(
        CustomErrorWalletMessages.WALLET_CONNECT_ERROR,
        WalletErrorType.WALLET_CONNECT_ERROR
      );
  }
};

export const myAlgoConnectErrorHandler = (error: Error | unknown) => {
  if ((error as Error).message === MyAlgoErrorMessages.OPERATION_CANCELLED) {
    throw new WalletError(
      CustomErrorWalletMessages.MY_ALGO_OPERATION_REJECTED_BY_USER,
      WalletErrorType.WALLET_CONNECT_SIGNATURE_REJECTED
    );
  }

  throw new WalletError(
    CustomErrorWalletMessages.MY_ALGO_CONNECTION_ERROR,
    WalletErrorType.WALLET_CONNECT_ERROR
  );
};

export const myAlgoErrorHandler = (error: Error | unknown) => {
  if ((error as Error).message === MyAlgoErrorMessages.OPERATION_CANCELLED) {
    throw new WalletError(
      CustomErrorWalletMessages.MY_ALGO_OPERATION_CANCELLED,
      WalletErrorType.WALLET_CONNECT_SIGNATURE_REJECTED
    );
  }

  throw new WalletError(
    CustomErrorWalletMessages.MY_ALGO_CONNECTION_ERROR,
    WalletErrorType.WALLET_CONNECT_ERROR
  );
};

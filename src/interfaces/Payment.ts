export interface Payment {
  hostAddress: string;
  guestAddress: string;
  status: PaymentStatus;
  releaseStatus: PaymentReleaseStatus;
  releaseDepositStatus: PaymentReleaseStatus;
  depositAddress: string;
  bookTotalAmount: number;
  fee: number;
  gasFee: number;
  depositAmount: number;
  releaseDepositTime: number;
  releaseHostTime: number;
  releaseGuestTime: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  contractABI: Record<string, any>[];
  contractAddress: string;
  amount: number;
  txHash: string;
  cleaningServiceFee?: number;
}

export interface FeeRecommendation {
  fast: number;
  medium: number;
  slow: number;
  baseFee: number;
  time: Date;
  block: number;
}

export interface FeeTransactionEstimation {
  gasLimit: string;
  gasPrice: string;
  estimations: Estimations;
}

export interface Estimations {
  safe: string;
  standard: string;
  fast: string;
  baseFee: string;
}

export interface PaymentMetadata {
  remainingHostReleaseTime: number;
  remainingGuestReleaseTime: number;
}
export enum PaymentStatus {
  waitingForPayment = "waiting-for-payment",
  success = "success",
  rejected = "rejected",
  inProcess = "in-process",
  claimedByGuest = "claimed-by-guest",
  claimedByHost = "claimed-by-host",
}

export const PaymentStatusMessages: Record<PaymentStatus, string> = {
  [PaymentStatus.waitingForPayment]: "Waiting for Payment",
  [PaymentStatus.success]: "Successful",
  [PaymentStatus.rejected]: "Rejected",
  [PaymentStatus.inProcess]: "In Process",
  [PaymentStatus.claimedByGuest]: "Claimed by Guest",
  [PaymentStatus.claimedByHost]: "Claimed by Host",
};

export enum PaymentReleaseStatus {
  released = "released",
  pending = "pending",
  inProcess = "in-process",
  waitingToReleaseTime = "waiting-to-release-time",
}

export const PaymentReleaseStatusMessages: Record<
  PaymentReleaseStatus,
  string
> = {
  [PaymentReleaseStatus.released]: "Payment Released",
  [PaymentReleaseStatus.pending]: "Payment Pending",
  [PaymentReleaseStatus.inProcess]: "Payment in Process",
  [PaymentReleaseStatus.waitingToReleaseTime]: "Waiting for Release Time",
};

export enum DepositGuarantyReleaseStatus {
  pending = "pending",
  released = "released",
  inProcess = "in-process",
  blocked = "blocked",
  waitingToReleaseTime = "waiting-to-release-time",
}

export const DepositGuarantyReleaseStatusMessages: Record<
  DepositGuarantyReleaseStatus,
  string
> = {
  [DepositGuarantyReleaseStatus.pending]: "Deposit Guaranty Pending",
  [DepositGuarantyReleaseStatus.released]: "Deposit Guaranty Released",
  [DepositGuarantyReleaseStatus.inProcess]: "Deposit Guaranty in Process",
  [DepositGuarantyReleaseStatus.blocked]: "Deposit Guaranty Blocked",
  [DepositGuarantyReleaseStatus.waitingToReleaseTime]:
    "Waiting for Deposit Guaranty Release Time",
};

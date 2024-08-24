import React from "react";
import { cookies } from "next/headers";
import { getVirtualAccountSSR } from "@/services/account";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect, notFound } from "next/navigation";
import BalanceCard from "@/components/BalanceCard";
import CryptoBedSeo from "@/constants/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...CryptoBedSeo,
  title: "CryptoBed - Balance",
  description: "Check your balance and make withdrawals",
};

const AccountBilling = async () => {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) {
      redirect("/", RedirectType.replace);
    }

    const { data: account } = await getVirtualAccountSSR(jwt.value);

    return (
      <div className="space-y-6 sm:space-y-8">
        <BalanceCard
          available={Number(account.availableBalance ?? 0)}
          balance={Number(account.accountBalance ?? 0)}
          coin={account.currency}
        />
      </div>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
};

export default AccountBilling;

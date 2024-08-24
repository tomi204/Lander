import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";
import { getUserDataSSR } from "@/services/users";
import AccountContainer from "./AccountContainer";
import CryptoBedSeo from "@/constants/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...CryptoBedSeo,
  title: "CryptoBed - Profile",
  description: "Check and update your data.",
};

export default async function AccountPage() {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) {
      redirect("/", RedirectType.replace);
    }

    const { data } = await getUserDataSSR(jwt.value);

    const { email, phoneNumber, about } = data;

    return <AccountContainer user={{ email, phoneNumber, about }} />;
  } catch (error) {
    console.log(error);
    notFound();
  }
}

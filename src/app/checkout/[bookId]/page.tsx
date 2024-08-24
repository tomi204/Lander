import { findBookById } from "@/services/books";
import { notFound, redirect } from "next/navigation";
import CheckOutPagePageMain from "../PageMain";
import { cookies } from "next/headers";
import { RedirectType } from "next/dist/client/components/redirect";
import { getUserDataSSR } from "@/services/users";

export interface CheckoutPageProps {
  params: {
    bookId: string;
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) {
      redirect("/", RedirectType.replace);
    }

    const [{ data }, book] = await Promise.all([
      getUserDataSSR(jwt.value),
      findBookById(params.bookId, jwt.value),
    ]);

    const { email, phoneNumber } = data;
    return <CheckOutPagePageMain book={book} email={email} phoneNumber={phoneNumber} />;
  } catch (error) {
    notFound();
  }
}

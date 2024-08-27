// import { findBookById } from "@/services/books";
// import { notFound, redirect } from "next/navigation";
// import CheckOutPagePageMain from "../PageMain";
// import { cookies } from "next/headers";
// // import { RedirectType } from "next/dist/client/components/redirect";
// // import { getUserDataSSR } from "@/services/users";

// export interface CheckoutPageProps {
//   params: {
//     id: string;
//   };
// }

// export default async function CheckoutPage({ params }: CheckoutPageProps) {
//   try {
  
//     const book = await findBookById( params.id );
//     console.log( book )
//     const { email, phoneNumber } = book;
//     return <CheckOutPagePageMain book={book} email={email} phoneNumber={phoneNumber} />;
//   } catch (error) {
//     notFound();
//   }
// }

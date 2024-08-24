import { Poppins } from "next/font/google";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import { AuthProvider } from "@/contexts/AuthContext";
import { Web3ModalProvider } from "@/contexts/Web3ModalProvider";
import { cookieToInitialState } from "@wagmi/core";
import { wagmiConfig as config } from "@/constants/wagmi-config";
import { headers } from "next/headers";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Web3ModalProvider initialState={initialState}>
          <AuthProvider>
            <ClientCommons />
            <SiteHeader />
            {children}
            <FooterNav />
            <Footer />
          </AuthProvider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}

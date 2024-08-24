import { Metadata } from "next";

const CryptoBedSeo: Metadata = {
  title: {
    default: "CryptoBed | Explore your next destination",
    template: "%s | Book Accommodations with ERC20 Tokens",
  },
  description:
    "CryptoBed is the leading platform for booking temporary accommodations using ERC20 tokens. Register with your compatible wallet and discover a new way to travel.",
  applicationName: "CryptoBed",
  authors: [
    {
      name: "CryptoBed Team",
      url: "https://www.cryptobed.xyz/",
    },
  ],
  generator: "CryptoBed Platform",
  keywords: [
    "accommodation",
    "booking",
    "ERC20 tokens",
    "metamask",
    "escrow",
    "smart contract",
    "cryptocurrency",
    "alojamiento",
    "reserva",
    "tokens ERC20",
    "metamask",
    "escrow",
    "contrato inteligente",
    "criptomoneda",
  ],
  referrer: "origin",
  themeColor: "#000000",
  colorScheme: "light",
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.cryptobed.xyz/",
  },
  icons: {
    icon: "https://www.cryptobed.xyz/icon.png",
    apple: "https://www.cryptobed.xyz/apple-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.cryptobed.xyz/",
    title: "CryptoBed - Book Accommodations with ERC20 Tokens",
    description:
      "CryptoBed is the leading platform for booking temporary accommodations using ERC20 tokens. Register with your compatible wallet and discover a new way to travel.",
    siteName: "CryptoBed",
    images: [
      {
        url: "https://www.cryptobed.xyz/og.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cryptobed",
    creator: "@cryptobed",
    images: "https://www.cryptobed.xyz/og.png",
  },
};

export default CryptoBedSeo;

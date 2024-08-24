import { StaticImageData } from "next/image";

import bolImg from "@/images/hero-right3-bol-2.png";
import argImg from "@/images/hero-right3-arg.png";

export interface HomeSettings {
  title: string;
  description: string;
  image: StaticImageData;
  link?: HomeSettingsLink;
}

export interface HomeSettingsLink {
  name: string;
  link: string;
}

export const homeSettingsConst: Record<string, HomeSettings> = {
  DEFAULT: {
    title: "The Web3 travel community",
    description:
      "We are a decentralized and anonymous short-term rental protocol, over the Polygon chain.",
    image: argImg,
  },
  AR: {
    title: "Buenos Aires, Argentina",
    description: "Argentina",
    image: argImg,
  },
  BO: {
    title: "La Paz, Bolivia",
    description: "Bolivia",
    image: bolImg,
  },
  "ETH-BO": {
    title: "La Paz, Bolivia",
    description: "UCB, La Paz",
    image: bolImg,
    link: {
      name: "Event Site",
      link: "https://ethbolivia.com/",
    },
  },
};

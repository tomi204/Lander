export { default as Twitter } from '../components/listing-image-gallery/components/Icons/Twitter';
import React from 'react';

interface IconProps {
  size?: number;
}

export const SolanaIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 2500 2500"
    xmlns="http://www.w3.org/2000/svg"
  >
    <linearGradient
      id="solana-gradient"
      x1="2.5%"
      x2="107.6%"
      y1="2.5%"
      y2="107.6%"
    >
      <stop offset="0%" stopColor="#00FFA3" />
      <stop offset="100%" stopColor="#DC1FFF" />
    </linearGradient>
    <path
      fill="url(#solana-gradient)"
      d="M493 1835a95 95 0 0 1 67-27h1447c40 0 60 49 32 78l-260 260a96 96 0 0 1-68 28H264c-40 0-60-49-32-78l261-260Zm0-780a95 95 0 0 1 67-28h1447c40 0 60 50 32 78l-260 260a95 95 0 0 1-68 27H264c-40 0-60-49-32-78l261-259Zm1517-520a95 95 0 0 1-68 28H495c-40 0-60-49-32-78l261-260a95 95 0 0 1 67-28h1447c40 0 60 49 32 78l-261 260Z"
    />
  </svg>
);

export const BNBIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 2500 2500"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#F3BA2F"
      d="M723 1211 1250 684l527 527-275 275-252-252-251 251-276-275Zm0-458 276-276 252 252-252 251-276-276ZM500 1434l252-252 275 275-252 252-275-275Zm1550-223-275 275-251-252 251-251 275 275Zm-276 528 276 276-275 275-252-251 251-252ZM1250 1007l251 252-251 251-252-251 252-252Zm0 1422 527-527-276-276-251 251-252-251-275 275 527 528Z"
    />
  </svg>
);

export const EthereumIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 417"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#343434" d="M127.2 0 125 8v276.9l2.2 2.2 126.8-74.5L127.2 0z" />
    <path fill="#8C8C8C" d="m127.2 0-126.8 213.4 126.8 74.5V154.2V0z" />
    <path
      fill="#3C3C3B"
      d="m127.2 305.2-1.3 1.5v109.5l1.3 3.8 127.3-178.6-127.3 63.8z"
    />
    <path fill="#8C8C8C" d="M127.2 420.1V305.2l-126.8-63.8 126.8 178.7z" />
    <path fill="#141414" d="m127.2 287.9 126.8-74.5-126.8-58.9v133.4z" />
    <path fill="#393939" d="m0.4 213.4 126.8 74.5V154.2l-126.8 59.2z" />
  </svg>
);

// export const PolygonIcon: React.FC<IconProps> = ({ size = 24 }) => (
//   <svg width={size} height={size} viewBox="0 0 38 33" xmlns="http://www.w3.org/2000/svg">
//     <path fill="#8247E5" d="M31.919 6.098 25.97 3.05a6.135 6.135 0 0 0-5.675 0l-5.95 3.05a6.023 6.023 0 0 0-2.836 5.195v6.104a6.025 6.025 0 0 0 2.836 5.195l5.95 3.05a6.136 6.136 0 0 0 5.675 0l5.95-3.05a6.024 6.024 0 0 0 2.836-5.195v-6.104a6.023 6.023 0 0 0-2.836-5.195Zm-8.366 18.85-5.95-3.05a2.008 2.008 0 0 1-.945-1.73v-6.104a2.008 2.008 0 0 1 .945-1.73l5.95-3.05a2.046 2.046 0 0 1 1.89 0l5.949 3.05a2.006 2.006 0 0 1 .945 1.73v6.104a2.007 2.007 0 0 1-.945 1.73l-5.95 3.05a2.046 2.046 0 0 1-1.89 0Zm.567-8.104..."
//   </svg>
// );

export const BaseIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 800 800"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="400" cy="400" r="400" fill="#0052FF" />
    <circle cx="400" cy="520" r="180" fill="#FFF" />
  </svg>
);

export const GithubIcon: React.FC<IconProps> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

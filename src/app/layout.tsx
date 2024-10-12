import { Poppins } from 'next/font/google';
import SiteHeader from './(client-components)/(Header)/SiteHeader';
import ClientCommons from './ClientCommons';
import './globals.css';
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css';
import '@/styles/index.scss';
import 'rc-slider/assets/index.css';
import Footer from '@/components/Footer';
import FooterNav from '@/components/FooterNav';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppKit } from '@/contexts/Web3ModalProvider';
import { TransactionProvider } from '@/contexts/CheckoutProvider';
import GTM from '@/components/GTM';
import { headers } from 'next/headers';
import { BlockchainProvider } from '@/contexts/BlockchainContext';
import { UserProvider } from '@/contexts/UserContext';
import { ChakraProvider } from '@chakra-ui/react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'viem/chains';
import '@rainbow-me/rainbowkit/styles.css';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const cookies = headers().get('cookie');
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <AppKit cookies={cookies}>
          <ChakraProvider>
            <BlockchainProvider>
              <UserProvider>
                <AuthProvider>
                  <ClientCommons />
                  <SiteHeader />
                  <TransactionProvider>{children}</TransactionProvider>
                  <FooterNav />
                  <Footer />
                </AuthProvider>
              </UserProvider>
            </BlockchainProvider>
          </ChakraProvider>
        </AppKit>
        <GTM />
      </body>
    </html>
  );
}

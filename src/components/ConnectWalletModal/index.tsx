import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  VStack,
  Text,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { BaseIcon, BNBIcon, EthereumIcon, SolanaIcon } from '@/icons';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { useAppKit } from '@reown/appkit/react';
import { WalletDefault } from '@coinbase/onchainkit/wallet';

const ConnectModal = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected, address } = useBlockchain();
  const { open } = useAppKit();
  console.log(isConnected, address, 'dadatatata isConnected');
  function HandleConnectWallet(chain: string) {
    if (chain === 'SOL' && selectedNetwork === 'SOL') {
      setSelectedNetwork('');

      onClose();
    } else if (chain === 'ETH') {
      setSelectedNetwork('');
      onClose();
      open({
        view: 'Connect',
      });
    }
  }

  useEffect(() => {
    setSelectedNetwork('');
  }, [isOpen]);
  return (
    <VStack p={6}>
      <Button onClick={onOpen}>Connect Wallet</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={4}>
            {/* <Text>Select a network to connect:</Text> */}
            <HStack mt={4} spacing={2} justifyContent={'center'}>
              {/* {selectedNetwork === '' && (
                <Button
                  flex={1}
                  //  colorScheme={selectedNetwork === 'SOL' ? 'blue' : 'gray'}
                  onClick={() => setSelectedNetwork('SOL')}
                >
                  <SolanaIcon />
                  SOL
                </Button>
              )} */}
              {/* {selectedNetwork === 'SOL' && (
                <p
                  className="m-auto w-11/12"
                  onClick={() => HandleConnectWallet('SOL')}
                >
                  <WalletMultiButton />
                </p>
              )} */}
              {/* <WalletDefault /> */}

              {selectedNetwork === '' && (
                <Button
                  flex={1}
                  onClick={() => {
                    onClose();
                    open({
                      view: 'Connect',
                    });
                  }}
                >
                  <EthereumIcon />

                  <Text>EVM</Text>
                </Button>
              )}
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default ConnectModal;

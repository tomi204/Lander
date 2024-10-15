'use client';
import {
  Swap,
  SwapAmountInput,
  SwapToggleButton,
  SwapButton,
  SwapMessage,
  SwapToast,
} from '@coinbase/onchainkit/swap';
import type { Token } from '@coinbase/onchainkit/token';
import { TokensBase } from '@/constants/Tokens';
import { useEffect, useState } from 'react';

interface SwapComponentsProps {
  tokens: Token[];
  selectedToken?: Token | null;
}

export default function SwapComponents({
  tokens,
  selectedToken,
}: SwapComponentsProps) {
  const swappableTokens = TokensBase as Token[];
  const [tokensToUse, setTokensToUse] = useState<Token[]>([]);

  useEffect(() => {
    setTokensToUse(tokens);
  }, [tokens]);

  if (!tokensToUse) {
    setTokensToUse(TokensBase as Token[]);
  }
  console.log(tokensToUse, 'tokensToUse');

  return (
    <Swap className="w-8/12 md:w-10/12 sm:w-full m-auto flex flex-col items-center justify-center bg-white">
      <SwapAmountInput
        label="Sell"
        className="rounded-3xl"
        swappableTokens={
          tokensToUse.length > 1 ? tokensToUse : (TokensBase as Token[])
        }
        token={selectedToken ? selectedToken : undefined}
        type="from"
      />
      <SwapToggleButton />
      <SwapAmountInput
        className="rounded-3xl"
        label="Buy"
        swappableTokens={swappableTokens}
        type="to"
      />
      <SwapButton />
      <SwapMessage />
      <SwapToast />
    </Swap>
  );
}

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

interface SwapComponentsProps {
  tokens: Token[];
}

export default function SwapComponents({ tokens }: SwapComponentsProps) {
  const swappableTokens = TokensBase as Token[];
  let tokensToUse = tokens;
  if (!tokens) {
    tokensToUse = TokensBase as Token[];
  }
  return (
    <Swap className="w-8/12 m-auto flex flex-col items-center justify-center bg-white">
      <SwapAmountInput
        label="Sell"
        className="rounded-3xl"
        swappableTokens={tokensToUse}
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

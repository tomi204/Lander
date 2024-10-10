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

export default function SwapComponents() {
  const swappableTokens = TokensBase as Token[];
  return (
    <Swap className="w-8/12 m-auto flex flex-col items-center justify-center bg-white">
      <SwapAmountInput
        label="Sell"
        className="rounded-3xl"
        swappableTokens={swappableTokens}
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

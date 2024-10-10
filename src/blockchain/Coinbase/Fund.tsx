import { FundButton, getOnrampBuyUrl } from '@coinbase/onchainkit/fund';

const projectId = process.env.NEXT_PUBLIC_CDP_API_KEY!;

if (!projectId) {
  throw new Error('NEXT_PUBLIC_ONCHAINKIT_API_KEY is not set');
}

const onrampBuyUrl = getOnrampBuyUrl({
  projectId,
  addresses: { address: ['base'] },
  assets: ['USDC'],
  presetFiatAmount: 20,
  fiatCurrency: 'USD',
});

<FundButton fundingUrl={onrampBuyUrl} />;

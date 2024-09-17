'use client';

import { LiFiWidget, WidgetSkeleton } from '@lifi/widget';
import { ClientOnly } from '../../utils/ClientOnly';
import React from 'react';

export const Swap = () => {
  const config = {
    appearance: 'light',
    theme: {
      container: {
        borderRadius: '16px',
      },
    },
    variant: 'wide',
    // It can be either default, split, or custom
    subvariant: 'split',
    // Optional, can be used to configure default split subvariant tabs state
    subvariantOptions: {
      split: 'bridge',
    },
  };

  return (
    <ClientOnly fallback={<WidgetSkeleton config={config} />}>
      <LiFiWidget config={config} integrator="nextjs-example" />
    </ClientOnly>
  );
};

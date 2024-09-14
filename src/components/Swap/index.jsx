'use client';

import { LiFiWidget, WidgetSkeleton } from '@lifi/widget';
import { ClientOnly } from '../../utils/ClientOnly';
import React from 'react';

export const Swap = () => {
  const config = {
    theme: {
      container: {
        borderRadius: '16px',
      },
    },
  };

  return (
    <ClientOnly fallback={<WidgetSkeleton config={config} />}>
      <LiFiWidget config={config} integrator="nextjs-example" />
    </ClientOnly>
  );
};

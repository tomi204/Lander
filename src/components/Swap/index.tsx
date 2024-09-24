'use client';

import { LiFiWidget, WidgetSkeleton } from '@lifi/widget';
import { ClientOnly } from '../../utils/ClientOnly';
import React from 'react';
import type { WidgetConfig } from '@lifi/widget';

export const Swap = () => {
  const config = {
    appearance: 'light',
    theme: {},
  } as Partial<WidgetConfig>;
  return (
    <React.Suspense fallback={<WidgetSkeleton config={config} />}>
      <LiFiWidget config={config} integrator="nextjs-example" />
    </React.Suspense>
  );
};

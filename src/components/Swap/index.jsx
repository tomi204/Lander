'use client';

import { LiFiWidget, WidgetSkeleton } from '@lifi/widget';
import { ClientOnly } from '../../utils/ClientOnly';
import React from 'react';

export const Swap = () => {
  const config = {
    variant: 'wide',
    appearance: 'black',
    theme: {
      palette: {
        primary: {
          main: '#0a4694',
        },
        secondary: {
          main: '#FFC800',
        },
        background: {
          default: '#ffffff',
          paper: '#f8f8fa',
        },
        text: {
          primary: '#00070F',
          secondary: '#6A7481',
        },
        grey: {
          200: '#EEEFF2',
          300: '#D5DAE1',
          700: '#555B62',
          800: '#373F48',
        },
      },
      shape: {
        borderRadius: 12,
        borderRadiusSecondary: 12,
        borderRadiusTertiary: 24,
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
      },
      container: {
        boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.08)',
        borderRadius: '16px',
      },
      components: {
        MuiCard: {
          defaultProps: {
            variant: 'filled',
          },
        },
        MuiTabs: {
          styleOverrides: {
            root: {
              backgroundColor: '#f8f8fa',
            },
          },
        },
      },
    },
  };
  return (
    <ClientOnly fallback={<WidgetSkeleton config={config} />}>
      <LiFiWidget config={config} integrator="nextjs-example" />
    </ClientOnly>
  );
};

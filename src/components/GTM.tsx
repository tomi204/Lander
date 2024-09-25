'use client';

import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const GTM = () => {
  useEffect(() => {
    TagManager.initialize({
      gtmId: 'GTM-57XX8RTR', 
    });
  }, []);

  return null;
};

export default GTM;

'use client';

import React from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import supabase from '@/utils/supabase/client';
import { Provider } from '@supabase/supabase-js';
import { oAuthSignIn } from '../actions';

const SUPABASE_REDIRECT = process.env.SUPABASE_CALLBACK_URL;

export default function Providerbuttons() {
  return (
    <div className="grid grid-cols-2 pt-20 gap-6">
      <Button
        variant="outline"
        onClick={async () => await oAuthSignIn('github')}
      >
        {Icons.gitHub({ className: 'mr-2 h-4 w-4' })}
        Github
      </Button>
      <Button
        variant="outline"
        onClick={async () => await oAuthSignIn('google')}
      >
        {Icons.google({ className: 'mr-2 h-4 w-4' })}
        Google
      </Button>
      <Button
        variant="outline"
        onClick={async () => await oAuthSignIn('twitter')}
      >
        {Icons.twitter({ className: 'mr-2 h-4 w-4' })}
        Twitter
      </Button>
      <Button
        variant="outline"
        onClick={async () => await oAuthSignIn('facebook')}
      >
        {Icons.facebook({ className: 'mr-2 h-4 w-4' })}
        Facebook
      </Button>
    </div>
  );
}

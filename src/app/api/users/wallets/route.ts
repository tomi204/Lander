import { NextResponse } from 'next/server';
import supabase from '@/utils/supabase/client';

export const fetchUsers = async () => {
  //TODO: FIX THIS @DAGGER
  const { data, error } = await supabase.from('wallets').select('*');
  if (error) {
    console.error('Error fetching users:', NextResponse.json(error));
  } else {
    return NextResponse.json(data);
  }
};

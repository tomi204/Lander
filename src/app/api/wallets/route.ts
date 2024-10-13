import { NextResponse } from 'next/server';
import supabase from '@/utils/supabase/client';

export async function GET() {
  const { data, error } = await supabase.from('wallets').select('*');

  if (error) {
    console.error('Error fetching wallets:', NextResponse.json(error));
  } else {
    console.log(data, 'wallets');
    return NextResponse.json(data);
  }
}

import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.from('wallets').select('*');

  // if (error) {
  //   console.error('Error fetching wallets:', NextResponse.json(error));
  // } else {
  return data;
  //}
}

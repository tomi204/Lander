import { NextResponse } from 'next/server';
import supabase from '@/supabase/client';

export async function GET() {
  const { data, error } = await supabase.from('wallets').select('*');

  if (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Error fetching users' },
      { status: 500 }
    );
  }
  if (data.length === 0) {
    return NextResponse.json({ error: 'No wallets found' }, { status: 404 });
  }

  return NextResponse.json(data);
}

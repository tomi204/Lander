import { NextResponse } from 'next/server';
import supabase from '@/supabase/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get('id');

  const { data, error } = await supabase
    .from('event_attendees')
    .select('*')
    .eq('id', id)
    .single();
  console.log(data, 'data infoo');
  if (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Error fetching events' },
      { status: 500 }
    );
  }
  if (data.length === 0) {
    return NextResponse.json({ error: 'No wallets found' }, { status: 404 });
  }

  return NextResponse.json(data);
}

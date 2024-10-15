import { NextResponse } from 'next/server';
import supabase from '@/supabase/client';

export async function GET() {
  let { data: events, error } = await supabase.from('events').select('*');

  if (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Error fetching events' }, { status: 500 });
  }

  if (events) {
    return NextResponse.json(events);
  } else {
    return NextResponse.json({ error: 'Users not found' }, { status: 404 });
  }
}
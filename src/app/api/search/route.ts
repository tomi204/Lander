import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get('location') || '';

  if (!location) {
    console.log('No location provided, returning empty array');
    return NextResponse.json([]);
  }

  try {
    const { data, error } = await supabase
      .from('location')
      .select('location')
      .ilike('location', `%${location}%`);

    if (error) {
      console.error('Error fetching locations:', error);
      return NextResponse.json(
        { error: 'Error fetching locations' },
        { status: 500 }
      );
    }

    console.log('Fetched data from Supabase:', data);

    return NextResponse.json(data.map((item) => item.location));
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Error inesperado' }, { status: 500 });
  }
}

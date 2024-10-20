import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: eventsWithAttendees, error } = await supabase
      .from('event_attendees')
      .select('*');

    if (error) {
      throw new Error(`Error fetching events with attendees: ${error.message}`);
    }

    return NextResponse.json({ eventsWithAttendees });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'An error occurred while processing the request',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

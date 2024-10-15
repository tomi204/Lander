import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

//http://localhost:3000/api/getAttendees?eventId=b77b09c4-5a38-4c41-991c-d0fc717515e2

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Create a Supabase client with admin privileges
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let { data: eventAttendees, error } = await supabase
      .from('event_attendees')
      .select(`

        user:users (
          id,
          name,
          wallet_evm,
          wallet_sol
        )
      `)
      .eq('event_id', eventId);



    if (error) {
      throw new Error(`Error fetching event attendees: ${error.message}`);
    }

    if (eventAttendees && eventAttendees.length > 0) {
      return NextResponse.json({ eventAttendees });
    } else {
      return NextResponse.json(
        { error: 'No attendees found for this event' },
        { status: 404 }
      );
    }
  } catch (error) {

    return NextResponse.json(
      { error: 'An error occurred while processing the request', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

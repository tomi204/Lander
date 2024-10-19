import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Crear el cliente Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );


    const { data: eventsWithAttendees, error } = await supabase
      .from('events')
      .select(
        `
        id,
        name,
        location,
        attendees:event_attendees (
          user_wallet,
          user:users (
            id,
            name,
            wallet_evm,
            wallet_sol
          )
        )
      `
      )
      .order('id', { ascending: true }); 


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

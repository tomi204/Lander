import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, eventId, userWallet } = body;

    // Validar que se reciban userId y eventId
    if (!userId || !eventId) {
      return NextResponse.json(
        { error: 'User ID and Event ID are required' },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );


    const { data: existingRegistration, error: checkError } = await supabase
      .from('event_attendees')
      .select('*')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .single(); // Solo queremos un registro

    if (checkError) {
      throw new Error(
        `Error checking existing registration: ${checkError.message}`
      );
    }


    if (existingRegistration) {
      return NextResponse.json(
        { error: 'User is already registered for this event' },
        { status: 400 }
      );
    }


    const { data, error } = await supabase.from('event_attendees').insert([
      {
        user_id: userId,
        event_id: eventId,
        user_wallet: userWallet || null,
      },
    ]);

    if (error) {
      throw new Error(`Error registering attendee: ${error.message}`);
    }

    return NextResponse.json({
      message: 'User successfully registered to the event',
      data,
    });
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

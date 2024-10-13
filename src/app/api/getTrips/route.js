import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch bookings where user.id matches owner_id
    const { data: trips, error: tripsError } = await supabase
      .from('trips')
      .select(
        `
        id,
        created_at,
        tx:transactions!trips_tx_id_fkey (
          id,
          amount,
          entrance_date,
          departure_date,
          buyer_wallet,
          buyer_id,
          main_image,
          nights
        ),
        property:properties!trips_property_id_fkey (
          id,
          title,
          location,
          main_image
        )
      `
      )
      .eq('buyer_id', user.id)
      .order('created_at', { ascending: false });

    if (tripsError) {
      console.error('Supabase error:', tripsError);
      return NextResponse.json(
        { error: 'Failed to fetch trips', details: tripsError },
        { status: 500 }
      );
    }
    console.log(trips, 'trips');
    if (!trips || trips.length === 0) {
      return NextResponse.json({ message: 'No trips found' }, { status: 404 });
    }

    // Return the trips
    return NextResponse.json(trips);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: error.message },
      { status: 500 }
    );
  }
}
export async function POST(req, res) {
  try {
    const supabase = createClient();
    const tx = await req.json();

    const { data, error } = await supabase
      .from('transactions')
      .insert(tx)
      .select();

    if (error) {
      return NextResponse.json({
        message: 'Error inserting product',
        error: error.message,
      });
    } else {
      console.log('Product inserted successfully', data);
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// data:

// [
//   {
//     id: '96739042-348c-4b99-9c1c-b9f5aaca2c53',
//     amount: 0.1,
//     entrance_date: '2024-08-29',
//     departure_date: '2024-08-30',
//     owner_id: 'b1482764-01e2-4399-9994-019b3eff337f',
//     property_id: 'ba53c728-427b-4b6f-909d-bc0ccf65a847',
//     created_at: '2024-08-28T01:09:28.321993+00:00',
//     updated_at: '2024-08-28T01:09:28.321993+00:00',
//     buyer_wallet: '0x9a93bc7e9718b3fc18D75dd58B47808d3f9Cb282',
//     tx_id: null,
//     chain: null,
//     nights: 1,
//     status: null
//   }
// ]

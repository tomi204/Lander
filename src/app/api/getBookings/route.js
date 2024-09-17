import { NextResponse } from 'next/server';
import supabase from '@/supabase/client';
import { createClient } from '@/supabase/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// TRANSACTIONS FOR OWNER
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet');

  if (!wallet) {
    return NextResponse.json(
      { error: 'Wallet address is required' },
      { status: 400 }
    );
  }

  try {
    const supabase = createServerComponentClient({ cookies });

    // Step 1: Find the user by wallet address
    let { data, error: userError } = await supabase
      .from('users')
      .select('bookings')
      .eq('wallet', wallet)
      .single();

    if (userError || !data) {
      throw new Error('User not found or error occurred.');
    }


    const { data: transactions, error: txError } = await supabase
      .from('transactions')
      .select(
        `
      *,
      property:property_id (
        id,
        title,
        location,
        description,
        main_image
      )  
    `
      )
      .in('uuid', data.bookings);

    if (txError) {
      throw new Error('Failed to fetch transactions.');
    }

    // Step 3: Return the transactions
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const wallet = searchParams.get('wallet');
//   console.log(wallet)
//   if (!wallet) {
//     return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
//   }

//   try {

//     let { data: user, error } = await supabase
//       .from('users')
//       .select('id')
//       .eq('wallet', wallet)
//       .single();

//     if (error || !user) {
//       throw new Error('Owner not found or error occurred.');
//     }

//     let { data: transactions, error: txError } = await supabase
//       .from('transactions')
//       .select('*')
//       .eq('owner_id', user.id);

//     if (txError) {
//       throw new Error('Failed to fetch transactions.');
//     }

//     return NextResponse.json(transactions);
//   } catch (error) {

//     console.log(error)
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// http://localhost:3000/api/transaction?wallet=0xd7ed1a1FC1295A0e7Ac16b5834F152F7B6306C0e

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

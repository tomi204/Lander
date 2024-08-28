import { NextResponse } from 'next/server';
import supabase from '@/supabase/client';
import { createClient } from "@/supabase/server";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// import { useAccount } from 'wagmi';


// {
//   "data": [
//     {
//       "id": "96739042-348c-4b99-9c1c-b9f5aaca2c53",
//       "attributes": {
//         "startDate": "2024-08-29",
//         "endDate": "2024-08-30",
//         "nights": 1,
//         "totalPrice": 0.1,
//         "status": null,
//         "stay": {
//           "id": "ba53c728-427b-4b6f-909d-bc0ccf65a847",
//           "attributes": {
//             "title": "Rustic Mountain Cabin",
//             "location": "Mountain Range, Country",
//             "description": "Cozy cabin nestled in the mountains surrounded by pristine nature.",
//             "image": "https://plus.unsplash.com/premium_photo-1686090449192-4ab1d00cb735?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D"
//           }
//         }
//       }
//     },
//     {
//       "id": "81d8c8c6-3c3e-4ee6-b71b-cc7927509e51",
//       "attributes": {
//         "startDate": "2024-08-29",
//         "endDate": "2024-08-30",
//         "nights": 1,
//         "totalPrice": 0.1,
//         "status": null,
//         "stay": {
//           "id": "ba53c728-427b-4b6f-909d-bc0ccf65a847",
//           "attributes": {
//             "title": "Rustic Mountain Cabin",
//             "location": "Mountain Range, Country",
//             "description": "Cozy cabin nestled in the mountains surrounded by pristine nature.",
//             "image": "https://plus.unsplash.com/premium_photo-1686090449192-4ab1d00cb735?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D"
//           }
//         }
//       }
//     }
//   ],
//     "meta": {
//     "pagination": {
//       "page": 1,
//         "pageSize": 10,
//           "pageCount": 1,
//             "total": 2
//     }
//   }
// }






// import React from 'react';
// import { useTransaction } from '@/contexts/CheckoutProvider';
// import { useState } from 'react';

// export default function StayDetailPage() {

// const { address } = useAccount();
//   const { bookings, setBookings } = useState() 


//   const [wallet, setWallet] = useState('');
//   const [transactions, setTransactions] = useState(null);
//   const [error, setError] = useState < string | null > (null);

//   const fetchTransactions = async () => {
//     try {
//       const response = await fetch(`/api/transaction?wallet=${address}`);
//       const result = await response.json();

//       if (response.ok) {
//         setBookings(result);
//         setError(null);
//       } else {
//         setError(result.error);
//         setBookings(null);
//       }
//     } catch (err) {
//       setError('An unexpected error occurred');
//       setBookings(null);
//     }
//   };

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet');

  if (!wallet) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  try {
    const supabase = createServerComponentClient({ cookies });

    // Step 1: Find the user by wallet address
    let { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('wallet', wallet)
      .single();

    if (userError || !user) {
      throw new Error('User not found or error occurred.');
    }

    // Step 2: Fetch transactions and related guest and stay details
    const { data: transactions, error: txError, count } = await supabase
      .from('transactions')
      .select(
        `
        *,
    
        stay:property_id (
          id,
          title,
          description,
          location,
          main_image
        )
      `,
        { count: 'exact' }
      )
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false })
      .range(
        parseInt(searchParams.get('start') || '0'),
        parseInt(searchParams.get('limit') || '10') - 1
      );

    if (txError) {
      throw new Error('Failed to fetch transactions.');
    }

    // Step 3: Format the data as needed
    const formattedData = transactions?.map((booking) => ({
      id: booking.id,
      attributes: {
        startDate: booking.entrance_date,
        endDate: booking.departure_date,
        nights: booking.nights,
        totalPrice: booking.amount,
        status: booking.status,
        stay: {
          id: booking.stay.id,
          attributes: {
            title: booking.stay.title,
            location: booking.stay.location,
            description: booking.stay.description,
            image: booking.stay.main_image,
          },
        },
      },
    })) || [];

    // Step 4: Return the formatted response with pagination metadata
    return NextResponse.json({
      data: formattedData,
      meta: {
        pagination: {
          page: Math.floor((parseInt(searchParams.get('start') || '0')) / (parseInt(searchParams.get('limit') || '10'))) + 1,
          pageSize: parseInt(searchParams.get('limit') || '10'),
          pageCount: Math.ceil((count || 0) / (parseInt(searchParams.get('limit') || '10'))),
          total: count || 0,
        },
      },
    });
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

    const { data, error } = await supabase.from("transactions").insert(tx).select();

    if (error) {
      return NextResponse.json({
        message: "Error inserting product",
        error: error.message,
      });
    } else {
      console.log("Product inserted successfully", data);
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
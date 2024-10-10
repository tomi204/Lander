import { Stay } from '@/data/types';
import { StrapiPaginatedResult } from '@/interfaces/StrapiPaginatedResults';
import { serverAxiosInstance } from './axios/instanceServer';
import { StrapiData } from '@/interfaces/Strapi';
import { extractData } from '@/utils/strapiParser';
import { Book, BookResponse } from '@/interfaces/Booking';
import supabase from '@/utils/supabase/client';
import { cache } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { updateBookings, updateTrips } from '@/services/users';

interface updateBookingProps {
  bookingId: string;
  status: string;
  txHash: string;
  owner_id: string;
  buyer_id: string;
  chain: string;
  owner_wallet: string;
  buyer_wallet: string;
  property_id: string;
  transactionInfo: {
    amount: string;
    from: string;
    to: string;
    decimals: number;
    token: string;
  };
}

export const updateBookingStatus = async ({
  bookingId,
  status,
  txHash,
  chain,
  property_id,
  owner_id,
  buyer_id,
  transactionInfo,
}: updateBookingProps): Promise<any> => {
  console.log(
    bookingId,
    status,
    txHash,
    chain,
    transactionInfo,
    'bookingId, status, txId, chain'
  );

  const owner = await updateBookings(owner_id, bookingId, property_id);
  const userId = await updateTrips(buyer_id, bookingId, property_id);

  const { data: tx, error } = await supabase
    .from('transactions')
    .update({
      status: status,
      tx_hash: txHash,
      chain: chain,
      updated_at: new Date().toISOString(),
      decimals: transactionInfo.decimals,
      token_address: transactionInfo.token,
      from: transactionInfo.from,
      to: transactionInfo.to,
      token_amount: transactionInfo.amount,
    })
    .eq('id', bookingId)
    .select()
    .single();

  console.log(tx);

  if (error) {
    throw new Error(`Failed to update booking status: ${error.message}`);
  }

  return tx.id;
};

export const findUsersBookingsSSR = async (
  token: string,
  params?: Record<string, any>
) => {
  return serverAxiosInstance.get<StrapiPaginatedResult<Book>>('/api/books/me', {
    withCredentials: true,
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findHostBookings = async (
  token: string,
  params?: Record<string, any>
) => {
  return serverAxiosInstance.get<StrapiPaginatedResult<Book>>(
    '/api/books/host',
    {
      withCredentials: true,
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// export const findHostBookingsSSR = async (
//   params?: Record<string, any>
// ) => {
//   const supabase = createServerComponentClient({ cookies });

//   const { data, error, count } = await supabase
//     .from('transactions')
//     .select(`
//       *,
//       guest:guest_id (
//         id,
//         name,
//         email
//       ),
//       stay:stay_id (
//         id,
//         title,
//         description
//       )
//     `, { count: 'exact' })
//     .eq('host_id', (await supabase.auth.getUser()).data.user?.id)
//     .order('created_at', { ascending: false })
//     .range(
//       params?.start || 0,
//       params?.limit ? (params.start || 0) + params.limit - 1 : 9
//     );

//   if (error) {
//     throw new Error(error.message);
//   }

//   const formattedData: any = data?.map(booking => ({
//     id: booking.id,
//     attributes: {
//       startDate: booking.start_date,
//       endDate: booking.end_date,
//       guest_number: booking.guest_number,
//       totalPrice: booking.total_price,
//       status: booking.status,
//       renter: {
//           id: booking.guest.id,
//           attributes: {
//             name: booking.guest.name,
//             // añadir calificacion

//         }
//       },
//       stay: {
//           id: booking.stay.id,
//           attributes: {
//             title: booking.stay.title,
//             location: booking.stay.location,
//             description: booking.stay.description,
//             image: booking.stay.image

//           }

//       }
//     }
//   })) || [];

//   return {
//     data: formattedData,
//     meta: {
//       pagination: {
//         page: Math.floor((params?.start || 0) / (params?.limit || 10)) + 1,
//         pageSize: params?.limit || 10,
//         pageCount: Math.ceil((count || 0) / (params?.limit || 10)),
//         total: count || 0,
//       }
//     }
//   };
// };

// export const findBookById = async (
//   id: string,
//   token: string
// ): Promise<Book> => {
//   const res = await serverAxiosInstance.get<BookResponse>(
//     `/api/books/${id}?populate=*`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       withCredentials: true,
//     }
//   );

//   return extractData(res) as Book;
// };

export const findBookById = cache(async (id: string): Promise<any> => {
  const { data, error } = await supabase
    .from('transactions')
    .select(
      `
      *,
      renter:buyer_id (
        id,
        name,
        email,
        phone,
        wallet_evm,
        wallet_sol
      ),
      owner:owner_id (
        id,
        name,
        email,
        phone,
        wallet_evm,
        wallet_sol
      ),
      property:property_id (
        id,
        title,
        location,
        description,
        main_image
      )

      )
    `
    )
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  } else {
    return data;
  }
});

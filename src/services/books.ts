import { Stay } from '@/data/types';
import { StrapiPaginatedResult } from '@/interfaces/StrapiPaginatedResults';
import { serverAxiosInstance } from './axios/instanceServer';
import { StrapiData } from '@/interfaces/Strapi';
import { extractData } from '@/utils/strapiParser';
import { Book, BookResponse } from '@/interfaces/Booking';
import supabase from '@/supabase/client';
import { cache } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { updateBookings, updateTrips} from '@/services/users';


export const updateBookingStatus = async (
  bookingId: string,
  status: string,
  txId: string,
  chain: string,
  owner_wallet: string,
  buyer_wallet: string
): Promise<any> => {
  console.log(bookingId, status, txId, chain, 'bookingId, status, txId, chain');


const owner = await updateBookings(owner_wallet, bookingId);
const userId = await updateTrips(buyer_wallet, bookingId);

console.log(owner, userId , 'owner, userId');

  const { data: tx, error } = await supabase
    .from('transactions')
    .update({
      status: status,
      tx_id: txId,
      chain: chain,
      updated_at: new Date().toISOString(),
      buyer_id: userId,
    })
    .eq('id', bookingId)
    .select()
    .single();

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
        wallet
      ),
      owner:owner_id (
        id,
        name,
        email,
        phone,
        wallet
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
    console.log(data);
  }

  return data;
});

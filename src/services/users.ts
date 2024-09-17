import { User } from '@/data/types';
import { serverAxiosInstance } from './axios/instanceServer';
import supabase from '@/supabase/client';
import { cache } from 'react';

export const updateBookings = async (owner_wallet: string, tx_id: string) => {
  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('bookings')
      .eq('wallet', owner_wallet)
      .single();

    if (userError || !user) {
      return {
        message: 'User not found or error occurred.',
        error: userError ? userError.message : 'User not found',
      };
    }
    // Update the bookings column with the tx_id
 const currentBookings = Array.isArray(user.bookings) ? user.bookings : [];
 const updatedBookings = [...currentBookings, tx_id];


    const { data, error: updateError } = await supabase
      .from('users')
      .update({ bookings: updatedBookings })
      .eq('wallet', owner_wallet);

    if (updateError) {
      return {
        message: 'Error updating user bookings with tx_id',
        error: updateError.message,
      };
    }

    console.log('Updated bookings:', updatedBookings);

    return updatedBookings;
  } catch (error) {
    return error;
  }
};

export const updateTrips = async (buyer_wallet: string, tx_id: string) => {
  try {


    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, trips')
      .eq('wallet', buyer_wallet)
      .single();

    if (userError || !user) {
      return {
        message: 'User not found or error occurred.',
        error: userError ? userError.message : 'User not found',
      };
    }
    // Update the bookings column with the tx_id
    const currentTrips = Array.isArray(user.trips) ? user.trips : [];
    const updatedTrips = [...currentTrips, tx_id];

    const {  error: updateError } = await supabase
      .from('users')
      .update({ trips: updatedTrips })
      .eq('wallet', buyer_wallet)
      .single();

    if (updateError) {
      return {
        message: 'Error updating user bookings with tx_id',
        error: updateError.message,
      };
    }


    return user.id 
  } catch (error) {
    return error;
  }
};

export const getUserDataSSR = async (token: string) => {
  return serverAxiosInstance.get<User>('/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserData = async () => {
  return serverAxiosInstance.get<User>('/api/users/me', {
    withCredentials: true,
  });
};

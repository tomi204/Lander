import { User } from '@/data/types';
import { serverAxiosInstance } from './axios/instanceServer';
import supabase from '@/utils/supabase/client';
import { cache } from 'react';

export const updateBookings = async (
  owner_id: string,
  tx_id: string,
  property_id: string
) => {
  try {
    // Get user data
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({ owner_id, tx_id, property_id })
      .single();

    if (bookingError) {
      return {
        message: 'Error creating booking.',
        error: bookingError.message,
      };
    }

    return booking;
  } catch (error) {
    return error;
  }
};

export const updateTrips = async (
  buyer_id: string,
  tx_id: string,
  property_id: string
) => {
  try {
    const { data: trip, error: tripError } = await supabase
      .from('trips')
      .insert({ buyer_id, tx_id, property_id })
      .single();

    if (tripError) {
      return {
        message: 'Error creating booking.',
        error: tripError.message,
      };
    }

    return trip;
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

export async function updateUserWallet(
  wallet: string,
  chain: 'evm' | 'solana'
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: 'User not found',
      error: 'No authenticated user',
    };
  }

  // Fetch current user data
  const { data: userData, error: fetchError } = await supabase
    .from('users')
    .select('wallet_evm, wallet_sol')
    .eq('id', user.id)
    .single();

  if (fetchError) {
    return {
      message: 'Error fetching user data',
      error: fetchError.message,
    };
  }

  let updateData: { wallet_evm?: string[]; wallet_sol?: string[] } = {};

  if (chain === 'evm') {
    const currentWallets = Array.isArray(userData.wallet_evm)
      ? userData.wallet_evm
      : [];
    if (!currentWallets.includes(wallet)) {
      updateData.wallet_evm = [...currentWallets, wallet];
    }
  } else if (chain === 'solana') {
    const currentWallets = Array.isArray(userData.wallet_sol)
      ? userData.wallet_sol
      : [];
    if (!currentWallets.includes(wallet)) {
      updateData.wallet_sol = [...currentWallets, wallet];
    }
  }

  // Only update if there are changes
  if (Object.keys(updateData).length > 0) {
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', user.id);

    if (error) {
      return {
        message: 'Error updating user wallet',
        error: error.message,
      };
    }

    return {
      message: 'Wallet updated successfully',
      data: updateData,
    };
  }

  return {
    message: 'Wallet already exists for this chain',
    data: null,
  };
}

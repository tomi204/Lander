import supabase from '@/supabase/client';
import type { NextApiRequest, NextApiResponse } from 'next';


type User = {
  id: string;
  wallet: string;
  verified: boolean;
  // Add other fields as necessary
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { wallet, verified } = req.body;

    if (!wallet || typeof verified !== 'boolean') {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }

    const updatedUser = await updateUserVerificationByWallet(wallet, verified);

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found or update failed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}





export async function updateUserVerificationByWallet(wallet: string, verified: boolean): Promise<User | null> {
  // Fetch the user by wallet
  const { data: user, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('wallet', wallet)
    .single(); // Ensure only one result is returned

  if (fetchError || !user) {
    console.error('Error fetching user:', fetchError?.message);
    return null;
  }

  // Update the user's verified status
  const { data: updatedUser, error: updateError } = await supabase
    .from('users')
    .update({ verified })
    .eq('wallet', wallet)
    .single(); // Update based on the wallet and return the updated user

  if (updateError) {
    console.error('Error updating user:', updateError.message);
    return null;
  }

  return updatedUser as User;
}
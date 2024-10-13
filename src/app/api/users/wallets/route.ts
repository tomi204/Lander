// import { NextResponse } from 'next/server';
// import supabase from '@/utils/supabase/client';

import { NextResponse } from 'next/server';

// export const fetchUsers = async () => {
//   //TODO: FIX THIS @DAGGER
//   const { data, error } = await supabase.from('wallets').select('*');
//   if (error) {
//     console.error('Error fetching users:', NextResponse.json(error));
//   } else {
//     return NextResponse.json(data);
//   }
// };

export async function GET() {
  return NextResponse.json({ message: 'Hello, world!' });
}

import { NextResponse } from 'next/server';
import supabase from '@/utils/supabase/client';

const fetchUsers = async () => {
  const { data, error } = await supabase.from('users').select('id, wallet_evm');

  if (error) {
    console.error('Error fetching users:', NextResponse.json(error));
  } else {

    console.log(data, "data");
    return NextResponse.json(data);
  }
};

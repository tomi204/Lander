import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';

export async function GET( { params }) {
  const { txId } = params;
 const supabase = createClient();
  try {
    const { data: transaction, error } = await supabase
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
    `
      )
      .eq('id', txId)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(transaction);
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

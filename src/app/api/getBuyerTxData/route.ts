import { NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // const transactionId = searchParams.get('transactionId');
  const wallet = searchParams.get('wallet');

  // if (!transactionId || !wallet) {
  //   return NextResponse.json(
  //     { error: 'Transaction ID and Wallet are required' },
  //     { status: 400 }
  //   );
  // }

  try {
    const supabase = createServerComponentClient({ cookies });

    // Step 1: Validate the transaction with the given ID and wallet
    const { data: transaction, error: transactionError } = await supabase
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
      .eq('buyer_wallet', wallet)
      .single();

    // .select('buyer_wallet')
    // .eq('id', transactionId)
    console.log({ transaction });

    if (transactionError || !transaction) {
      throw new Error('Transaction not found or wallet does not match.');
    }

    console.log({ transaction });

    return NextResponse.json(transaction || [], { status: 200 });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

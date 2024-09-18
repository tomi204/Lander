// import { db } from '@/lib/db'
import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';
// import { pusher } from '@/lib/pusher';

export async function POST(req) {
  const { text, txId } = await req.json();
  const supabase = createClient();

  try {
    // Save the message to your database
    const { data, error } = await supabase
      .from('messages')
      .insert({ text, transaction_id: txId })
      .single();

    if (error) throw error;

    // Trigger the pusher event
    // await pusher.trigger(`chat-${txId}`, 'new-message', {
    //   id: data.id,
    //   text: data.text,
    //   created_at: data.created_at,
    // });

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
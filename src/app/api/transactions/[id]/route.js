import { NextResponse } from 'next/server';
import dummy from "@/Types/dummy.json";  // Adjust the import path as necessary

import { cache } from 'react';
import supabase from '@/supabase/client';

export async function GET(req, { params }) {
  const { id } = params;

    const { data, error } = await supabase
      .from('properties')  // Specify the type of the table
      .select()
      .eq('id', id)
      .single();  // Assumes that the query will return a single object

  if (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }

  const transaction = data;


  if (transaction) {
    return NextResponse.json(transaction);
  } else {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }
}

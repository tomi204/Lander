import { NextResponse } from 'next/server';
import supabase from '@/supabase/client';
import { NextApiRequest, NextApiResponse } from "next";
import { createSuperbaseServerClient } from "@/supabase/server";



export async function GET() {
  let { data: users, error } = await supabase.from('users').select('*');

  if (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }

  if (users) {
    return NextResponse.json(users);
  } else {
    return NextResponse.json({ error: 'Users not found' }, { status: 404 });
  }
}
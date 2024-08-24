import { NextResponse } from 'next/server';
import dummy from "@/Types/dummy.json";  // Adjust the import path as necessary
import supabase from '@/supabase/client';
import { createClient } from "@/utils/supabase/server";

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


export async function POST(req,res) {


  const supabase = createClient();

  const { name, email, role , wallet } = await req.json();
console.log("lo que viene ",req.body)
  

  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          role,
          password_hash,
          score,
          wallet,
          created_at: new Date(),
        },
      ]);

    const users = data 

    if (error) {
      throw error;
    }

    if (users) {
      return NextResponse.json(users);
  } else {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }



  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
}
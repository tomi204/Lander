import { NextResponse } from 'next/server';
import supabase from '@/supabase/client';
import { createClient } from "@/supabase/server";

export async function POST(req, res) {

  try {
    const supabase = createClient();
    const tx = await req.json();

    const { data, error } = await supabase.from("transactions").insert(tx).select();

    if (error) {
      return NextResponse.json({
        message: "Error inserting product",
        error: error.message,
      });
    } else {
      console.log("Product inserted successfully", data);
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
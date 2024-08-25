import { NextResponse } from 'next/server';
import dummy from "@/Types/dummy.json";  // Adjust the import path as necessary

export async function GET(req, { params }) {
  const { id } = params;
  const property = dummy.properties.find(prop => prop.id.toString() === id);

  if (property) {
    return NextResponse.json(property);
  } else {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }
}


export async function POST(req, { params }) {
  const { id } = params;
  const property = dummy.properties.find(prop => prop.id.toString() === id);

  if (property) {
    return NextResponse.json(property);
  } else {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }
}
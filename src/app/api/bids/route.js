import { NextResponse } from 'next/server';


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
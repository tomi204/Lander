import { NextResponse } from 'next/server';
import supabase from '@/supabase/client';
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/supabase/server";



export async function GET() {
  let { data: users, error } = await supabase.from('properties').select('*');

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






export async function POST(req, res) {


  try {
    const supabase = createClient();
    const productPayload = await req.json();

    console.log(productPayload);

    const product = {
      ...productPayload,

    };

    const { data, error } = await supabase.from("properties").insert([product]);

    if (error) {
      return NextResponse.json({
        message: "Error inserting product",
        error: error.message,
      });
    } else {
      console.log("Product inserted successfully",data);
    }

    const images = productPayload.selectedFiles;

    await Promise.all(
      images.map(async (image) => {
        const filePath = `public/products/${product.id}/${image.originalname}`; // Adjust the path as needed
        const { error: uploadError } = await supabase.storage
          .from("image_products") // Replace with your actual bucket name
          .upload(filePath, image.buffer); // Assuming images are sent as Buffer objects

        if (uploadError) {
          throw new Error(
            `Error uploading image ${image.originalname}: ${uploadError.message}`
          );
        }
      })
    );



    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the request
  
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


async function uploadImagesToProductFolder(productId, files) {
  const supabase = createClient();
  const folderPath = `products/${productId}/`;
  for (let file of files) {
    const fileName = `${Date.now()}-${file.name}`; // Generate a unique file name
    const filePath = `${folderPath}${fileName}`;
    const { error } = await supabase.storage
      .from("image_products") // Replace with your bucket name
      .upload(filePath, file);

    if (error) {
      console.error(`Error uploading ${file.name}:`, error);
    } else {
      console.log(`${file.name} uploaded successfully`);
      // Update your database with the new image path
    }
  }
  if (error) {
    console.error(`Error uploading ${file.name}:`, error);
  } else {
    console.log(`${file.name} uploaded successfully`);
    // Update your database with the new image path
  }
}


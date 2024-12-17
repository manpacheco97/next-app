import { db } from '@/lib/db';
import { uploadToS3 } from '@/lib/s3';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import formidable from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import { IncomingMessage } from 'http';

export async function GET() {
  try {
    const products = await db.selectFrom('products').selectAll().execute();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Error al buscar los productos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const image = formData.get('image') as File;

    if (!name || !price) {
      return NextResponse.json(
        { message: 'Nombre y precio son requeridos' },
        { status: 400 }
      );
    }

    let imageUrl = null;
    
    if (image) {
      if (!image.type.startsWith('image/')) {
        return NextResponse.json(
          { message: 'El archivo debe ser una imagen' },
          { status: 400 }
        );
      }

      const fileExtension = image.name.split('.').pop() || 'jpg';
      const fileName = `${uuidv4()}.${fileExtension}`;
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      imageUrl = await uploadToS3({ 
        buffer,
        mimetype: image.type,
        originalFilename: image.name 
      }, fileName);
    }

    const [product] = await db
      .insertInto('products')
      .values({
        name: name,
        description: description,
        price: parseFloat(price),
        image_url: imageUrl,
      })
      .returning('id')
      .execute();

    return NextResponse.json({ id: product.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Error al crear el producto' },
      { status: 500 }
    );
  }
} 
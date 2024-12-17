import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q');
  const categoryId = searchParams.get('category');

  if (!q && !categoryId) {
    return NextResponse.json(
      { message: 'Se requiere un término de búsqueda o categoría' },
      { status: 400 }
    );
  }

  try {
    let query = db
      .selectFrom('products')
      .leftJoin('categories', 'categories.id', 'products.category_id')
      .select([
        'products.id',
        'products.name',
        'products.description',
        'products.price',
        'products.image_url',
        'categories.name as category_name',
        'categories.id as category_id'
      ]);

    if (q) {
      query = query.where('products.name', 'ilike', `%${q}%`);
    }

    if (categoryId) {
      query = query.where('products.category_id', '=', parseInt(categoryId));
    }

    const products = await query.execute();

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { message: 'Error searching products' },
      { status: 500 }
    );
  }
} 
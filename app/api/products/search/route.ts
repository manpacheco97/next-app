import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q');

  if (!q || q.trim() === '') {
    return NextResponse.json(
      { message: 'Consulta de búsqueda inválida' },
      { status: 400 }
    );
  }

  try {
    const products = await db
      .selectFrom('products')
      .selectAll()
      .where('name', 'ilike', `%${q}%`)
      .execute();

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { message: 'Error searching products' },
      { status: 500 }
    );
  }
} 
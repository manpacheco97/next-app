// app/search/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/ui/header';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim() !== '') {
      axios
        .get(`/api/products/search?q=${encodeURIComponent(query)}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('Error searching products:', error);
        });
    }
  }, [query]);

  return (
    <>
      <main className="bg-background p-4">
        <h1 className="text-2xl font-bold mb-4">Resultados de búsqueda para "{query}"</h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-md p-4 flex flex-col items-center"
              >
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Sin imagen</span>
                  </div>
                )}
                <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                <p className="mt-1 text-gray-600">${product.price.toFixed(2)}</p>
                <Link href={`/products/${product.id}`}>
                  <a className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Ver detalles
                  </a>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </main>
    </>
  );
}

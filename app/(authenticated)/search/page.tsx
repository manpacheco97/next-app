// app/search/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '@/types';
import ProductCard from '@/components/ui/productCard';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim() !== '') {
      axios
        .get(`/api/products/search?q=${encodeURIComponent(query)}`)
        .then((response) => {
          const productsWithParsedPrices = response.data.map((product: Product) => ({
            ...product,
            price: typeof product.price === 'string' ? parseFloat(product.price) : product.price
          }));
          setProducts(productsWithParsedPrices);
        })
        .catch((error) => {
          console.error('Error searching products:', error);
        });
    }
  }, [query]);

  return (
    <main className="bg-background p-4">
      <h1 className="text-2xl font-bold mb-4">Resultados de búsqueda para "{query}"</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </main>
  );
}

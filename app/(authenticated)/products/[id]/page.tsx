// app/products/[id]/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/products/${params.id}`)
      .then((response) => {
        const productData = {
          ...response.data,
          price: parseFloat(response.data.price)
        };
        setProduct(productData);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        router.push('/');
      });
  }, [params.id, router]);

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  return (
    <>
      <main className="bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full md:w-1/2 h-auto object-cover"
              />
            ) : (
              <div className="w-full md:w-1/2 h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Sin imagen</span>
              </div>
            )}
            <div className="md:ml-8 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="mt-2 text-gray-600">${product.price.toFixed(2)}</p>
              <p className="mt-4">{product.description}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

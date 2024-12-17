'use client';

import ProductList from '@/components/productList';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push('/login');
  }

  if (status === 'loading') {
    return <p>Cargando...</p>;
  }

  return (
    <main className="bg-background p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link href="/products/new">
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <FiPlus className="mr-2" />
            Agregar Producto
          </button>
        </Link>
      </div>
      <ProductList />
    </main>
  );
}

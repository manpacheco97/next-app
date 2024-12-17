'use client';

import { useSession } from 'next-auth/react';
import LoadingSpinner from './ui/loadingSpinner';
import ProductList from './productList';

export default function Home() {
  const { status } = useSession();

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <main className="bg-background p-4">
      <ProductList />
    </main>
  );
}

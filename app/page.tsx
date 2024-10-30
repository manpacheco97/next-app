'use client';

import LoadingSpinner from '@/components/ui/loadingSpinner';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (session) {
    return (
      <>
        <p>Bienvenido, {session.user?.name}!</p>
        <button onClick={() => signOut()}>Cerrar sesión</button>
      </>
    );
  }

  return <p>Redirigiendo al inicio de sesión...</p>;
}

// app/profile/page.tsx

'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push('/login');
  }

  if (status === 'loading') {
    return <p>Cargando...</p>;
  }

  const user = session?.user;

  return (
    <>
      <main className="bg-background p-4">
        <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
        <div className="flex items-center space-x-4">
          {user?.image ? (
            <img
              src={user.image}
              alt="Perfil"
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-300" />
          )}
          <div>
            <p className="text-xl font-semibold">{user?.name}</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
      </main>
    </>
  );
}

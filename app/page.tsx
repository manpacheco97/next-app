import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import Home from "@/components/home";

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  console.log('Session active:', session);

  return (
    <main className="min-h-screen">
      <Home />
    </main>
  );
} 
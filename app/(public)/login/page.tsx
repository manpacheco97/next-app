// app/login/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAlert } from '@/context/alertContext';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  const { showAlert } = useAlert();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

   useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (registered === 'true') {
      showAlert('success', '¡Registro exitoso! Ahora puedes iniciar sesión.');
      router.replace('/login', undefined);
    }
  }, [registered, showAlert, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.ok) {
      router.push('/');
    } else {
      const errorMessage = res?.error || 'Credenciales incorrectas';
      setError(errorMessage);
      showAlert('error', errorMessage);
    }
  };

  return (  
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-md shadow">
        <div className="flex justify-center">
          <Image
            src="/images/logo.svg"
            alt="Logo de la App"
            width={100}
            height={100}
            className="object-contain w-24 h-24 sm:w-32 sm:h-32"
          />
        </div>

        <h2 className="text-2xl font-bold text-center">Iniciar sesión</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-full">
            Iniciar sesión
          </Button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-1">
            <Separator />
          </div>
          <span className="mx-2 text-sm text-muted-foreground">o</span>
          <div className="flex-1">
            <Separator />
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full flex items-center justify-center transition-colors duration-300 hover:bg-gray-100"
        >
          <Image
            src="/images/google-logo.svg"
            alt="Google Logo"
            width={24}
            height={24}
            className="mr-2"
          />
          Iniciar sesión con Google
        </Button>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿No tienes una cuenta?{' '}
          <a href="/register" className="text-primary hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}

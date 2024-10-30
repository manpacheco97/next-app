'use client';

import { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

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
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-md shadow">
        <div className="flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Logo de la App"
            width={100}
            height={100}
            className="object-contain"
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
          onClick={() => signIn('google')}
          className="w-full"
        >
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

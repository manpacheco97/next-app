import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

interface RegisterRequestBody {
  email: string;
  name: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { email, name, password } = (await request.json()) as RegisterRequestBody;

    if (!email || !name || !password) {
      return NextResponse.json({ message: 'Todos los campos son obligatorios.' }, { status: 400 });
    }

    const existingUser = await db.selectFrom('users').selectAll().where('email', '=', email).executeTakeFirst();

    if (existingUser) {
      return NextResponse.json({ message: 'El correo electrónico ya está en uso.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.insertInto('users').values({
      email,
      name,
      password: hashedPassword,
    }).execute();

    return NextResponse.json({ message: 'Usuario registrado exitosamente.' }, { status: 201 });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}

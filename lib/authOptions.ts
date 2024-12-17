// lib/authOptions.ts

import type { NextAuthOptions, User, Account, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Credenciales inválidas');
        }

        const user = await db
          .selectFrom('users')
          .selectAll()
          .where('email', '=', credentials.email)
          .executeTakeFirst();

        if (!user) {
          throw new Error('Usuario no encontrado');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Contraseña incorrecta');
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (account?.provider === 'google') {
        // Verificar si el usuario ya existe
        const existingUser = await db
          .selectFrom('users')
          .selectAll()
          .where('email', '=', user.email!)
          .executeTakeFirst();

        if (!existingUser) {
          // Crear un nuevo usuario si no existe
          await db
            .insertInto('users')
            .values({
              name: user.name,
              email: user.email!,
              password: '', // No se almacena contraseña para usuarios de Google
            })
            .execute();
        }
      }
      return true;
    },
    async session({ session }: { session: Session }) {
      if (session.user && session.user.email) {
        const dbUser = await db
          .selectFrom('users')
          .selectAll()
          .where('email', '=', session.user.email)
          .executeTakeFirst();

        if (dbUser) {
          session.user.id = dbUser.id.toString();
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Habilita el modo de depuración para NextAuth
  session: {
    strategy: 'jwt',
  },
};

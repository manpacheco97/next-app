'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-blue-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="Logo de la App"
                width={50}
                height={50}
                className="h-12 w-auto invert"
              />
            </Link>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-2 py-1 border rounded-l-md"
              />
              <button
                type="submit"
                className="px-2 py-1 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
              >
                Buscar
              </button>
            </form>
            {/* Eliminamos el enlace "Inicio" */}
            <Link href="/products" className="text-white hover:text-gray-200">
              Productos
            </Link>
            {session && (
              <div className="flex items-center space-x-2">
                <img
                  src={session.user?.image || '/images/default-profile-logo.png'}
                  alt="Perfil"
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/default-profile-logo.png';
                  }}
                />
                <Link href="/profile" className="text-white hover:text-gray-200">
                  {session.user?.name}
                </Link>
              </div>
            )}
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="text-white hover:text-gray-200"
              title="Cerrar sesión"
            >
              <FiLogOut className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-800 text-white" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-2 py-1 border-gray-300 rounded-l-md"
              />
              <button
                type="submit"
                className="px-2 py-1 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
              >
                Buscar
              </button>
            </form>
            {/* Eliminamos el enlace "Inicio" */}
            <Link
              href="/products"
              className="block text-white hover:text-gray-200 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Productos
            </Link>
            {session && (
              <Link
                href="/profile"
                className="block text-white hover:text-gray-200 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {session.user?.name}
              </Link>
            )}
            <button
              onClick={() => {
                signOut({ callbackUrl: '/login' });
                setIsOpen(false);
              }}
              className="block text-left w-full text-white hover:text-gray-200 px-3 py-2 rounded-md text-base font-medium"
              title="Cerrar sesión"
            >
              <FiLogOut className="h-6 w-6 inline-block" /> Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

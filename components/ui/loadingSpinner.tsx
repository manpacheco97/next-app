// components/ui/LoadingSpinner.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import Spinner from './spinner';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="mb-6">
        <Image
          src="/images/logo.svg"
          alt="Logo de la App"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>

      <div className="mt-6">
        <Spinner />
      </div>

      <p className="mt-4 text-lg text-gray-600">Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;

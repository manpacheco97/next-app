'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useAlert } from '@/context/alertContext';

export default function NewProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showAlert } = useAlert();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  if (status === 'unauthenticated') {
    router.push('/login');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showAlert('error', 'Por favor selecciona un archivo de imágen válido');
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('price', formData.price);
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      const res = await fetch('/api/products', {
        method: 'POST',
        body: submitData,
      });

      if (res.ok) {
        const data = await res.json();
        showAlert('success', 'Producto creado exitosamente');
        router.push(`/products/${data.id}`);
      } else {
        const errorData = await res.json();
        showAlert('error', errorData.message || 'Error al crear el producto');
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert('error', 'Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="description" className="block font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="price" className="block font-medium text-gray-700">
                Precio
              </label>
              <input
                type="number"
                name="price"
                id="price"
                required
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="image" className="block font-medium text-gray-700">
                Imagen del Producto
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? 'Creando...' : 'Crear Producto'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

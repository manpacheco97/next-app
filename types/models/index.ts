// Crear un nuevo archivo para los modelos de dominio
export interface User {
  id: number;
  name: string | null;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  createdAt: Date;  // Nota: cambiado a camelCase para seguir convenciones de TypeScript
  updatedAt: Date;
} 
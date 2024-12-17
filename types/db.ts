import { Generated } from 'kysely';

export interface DB {
  users: UsersTable;
  products: ProductsTable;
  categories: CategoriesTable;
  migrations: MigrationsTable;
}

export interface UsersTable {
  id: Generated<number>;
  name: string | null;
  email: string;
  password: string;
}

export interface ProductsTable {
  id: Generated<number>;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: number | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface CategoriesTable {
  id: Generated<number>;
  name: string;
  description: string | null;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface MigrationsTable {
  name: string;
} 
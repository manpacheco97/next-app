import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Crear tabla de categorías
  await db.schema
    .createTable('categories')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  // Agregar columna category_id a la tabla products
  await db.schema
    .alterTable('products')
    .addColumn('category_id', 'integer', (col) => 
      col.references('categories.id').onDelete('set null')
    )
    .execute();

  // Insertar categorías iniciales
  await db
    .insertInto('categories')
    .values([
      {
        name: 'Pantalones',
        description: 'Todo tipo de pantalones: jeans, deportivos, formales',
      },
      {
        name: 'Remeras',
        description: 'Remeras y camisetas de diferentes estilos',
      },
      {
        name: 'Zapatos',
        description: 'Calzado deportivo y casual',
      },
      {
        name: 'Accesorios',
        description: 'Cinturones, gorras, bufandas y más',
      },
      {
        name: 'Abrigos',
        description: 'Camperas, buzos, sweaters y chalecos',
      }
    ])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('products')
    .dropColumn('category_id')
    .execute();

  await db.schema
    .dropTable('categories')
    .execute();
} 
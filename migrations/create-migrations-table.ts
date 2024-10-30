import { Kysely, sql } from 'kysely'
import { Database } from '../lib/db' // Asegúrate de que el tipo Database esté correctamente definido

export async function up(db: Kysely<Database>): Promise<void> {
  const result = await db
    .selectFrom(sql`pg_tables`.as('t'))
    .select(sql`EXISTS (
        SELECT 1 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'migrations'
      )`.as('exists'))
    .execute()

  const exists = result[0]?.exists

  if (!exists) {
    await db.schema
      .createTable('migrations')
      .addColumn('name', 'varchar(255)', (col) => col.primaryKey())
      .addColumn('executed_at', 'timestamp', (col) => col.notNull().defaultTo(sql`NOW()`))
      .execute()

    console.log('Tabla de migraciones creada')
  } else {
    console.log('La tabla de migraciones ya existe')
  }
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('migrations').ifExists().execute()
  console.log('Tabla de migraciones eliminada')
}

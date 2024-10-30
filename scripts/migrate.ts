import { migrator } from '../lib/migrator'
import { db } from '../lib/db'

console.log('DATABASE_URL:', process.env.DATABASE_URL) // Debería mostrar el valor de DATABASE_URL

const runMigrations = async () => {
  try {
    const migrations = await migrator.up()
    migrations.forEach((migration) => {
      console.log(`Migración aplicada: ${migration.name}`)
    })
  } catch (err) {
    console.error('Error al aplicar migraciones:', err)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

runMigrations()

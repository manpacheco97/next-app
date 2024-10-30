import { migrator } from '../lib/migrator'
import { db } from '../lib/db'

const revertMigrations = async () => {
  try {
    const migrations = await migrator.down()
    migrations.forEach((migration) => {
      console.log(`Migración revertida: ${migration.name}`)
    })
  } catch (err) {
    console.error('Error al revertir migraciones:', err)
    process.exit(1)
  } finally {
    await db.destroy()
  }
}

revertMigrations()

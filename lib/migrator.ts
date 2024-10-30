import { Umzug } from 'umzug'
import { db } from './db'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const migrator = new Umzug({
  migrations: {
    glob: ['../migrations/*.ts', { cwd: __dirname }],
    resolve: ({ name, path: migrationPath, context }) => {
      if (!migrationPath) {
        throw new Error(`La ruta de la migración está indefinida para: ${name}`)
      }
      const fullPath = path.resolve(__dirname, migrationPath)
      return {
        name,
        up: async () => {
          const migration = await import(fullPath)
          await migration.up(context)
        },
        down: async () => {
          const migration = await import(fullPath)
          await migration.down(context)
        },
      }
    },
  },
  context: db,
  storage: {
    async executed({ context }) {
      const results = await context
        .selectFrom('migrations')
        .select('name')
        .execute()
      return results.map((result) => result.name)
    },
    async logMigration({ name, context }) {
      await context.insertInto('migrations').values({ name }).execute()
    },
    async unlogMigration({ name, context }) {
      await context
        .deleteFrom('migrations')
        .where('name', '=', name)
        .execute()
    },
  },
  logger: console,
})

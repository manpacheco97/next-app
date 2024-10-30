import pkg from 'pg'
const { Pool } = pkg

import { Kysely, PostgresDialect, Generated } from 'kysely'

export interface Database {
  users: UsersTable
  migrations: MigrationsTable
}

interface UsersTable {
  id: Generated<number>
  name: string | null
  email: string
  password: string
}

interface MigrationsTable {
  name: string
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
})

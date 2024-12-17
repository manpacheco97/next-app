import { Kysely, PostgresDialect } from 'kysely';
import type { DB } from '@/types/db';
import pg from 'pg';

const { Pool } = pg;

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  })
});

export const db = new Kysely<DB>({
  dialect,
});

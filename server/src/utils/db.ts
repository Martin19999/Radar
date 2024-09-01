import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  // connectionString: process.env.DATABASE_URL
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT ?? '5432', 10),
  database: process.env.PGDATABASE
});

console.log(pool);

export const query = (text: string, params?: any[]) => pool.query(text, params);

import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123',
  database: 'inventorydb',
});

export default pool;

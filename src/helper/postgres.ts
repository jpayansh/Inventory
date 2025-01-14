import { Pool } from 'pg';

const pool = new Pool({
  host: '192.168.253.1',
  port: 5432,
  user: 'postgres',
  password: '123',
  database: 'inventorydb',
});

export default pool;

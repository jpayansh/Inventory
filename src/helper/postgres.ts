import { Pool } from 'pg';

const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  user: 'node1',
  password: '123',
  database: 'inventorydb',
});

export default pool;

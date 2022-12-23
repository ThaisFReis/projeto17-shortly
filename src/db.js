import pkg from 'pg';

const { Pool } = pkg;

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

export default connection;
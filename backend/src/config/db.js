import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config();

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const connectToDb = async () => {
  try {
    await connection.connect();
    console.log('Database is connected.');
  } catch (error) {
    console.error('Database is not connected:', error);
  }
};

export { connection, connectToDb };
import { connection } from '../config/db.js';

const createUser = async (user) => {
  const { username, email, password, role } = user;
  const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  await connection.execute(query, [username, email, password, role]);
};

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await connection.execute(query, [email]);
  return rows[0];
};

export { createUser, findUserByEmail };

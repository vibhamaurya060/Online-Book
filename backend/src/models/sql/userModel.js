import { sequelize } from '../../config/db.js';

const createUser = async (user) => {
  const { username, email, password, role } = user;
  const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  await sequelize.query(query, { replacements: [username, email, password, role] });
};

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [results] = await sequelize.query(query, { replacements: [email] });
  return results[0];
};

export { createUser, findUserByEmail };

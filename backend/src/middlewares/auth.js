import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'Token is not provided' });
  }

  jwt.verify(token, process.env.JET_SECRET, (err, result) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    } else {
      req.result = result;
      next();
    }
  });
};

export default auth;

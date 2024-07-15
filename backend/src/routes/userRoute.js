import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/sql/userModel.js';
// import { createUser, findUserByEmail } from '../models/sql/userModel.js';

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'This is not a valid body' });
    }

    const existUser = await findUserByEmail(email);

    if (existUser) {
      return res.status(400).json({ message: 'This email is already registered. Try to login.' });
    }

    const hashPassword = bcrypt.hashSync(password, 12);
    await createUser({ email, password: hashPassword, username, role });

    res.status(201).json({ message: 'User is registered successfully.' });
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'This is not a valid body' });
    }

    const existUser = await findUserByEmail(email);
    if (!existUser) {
      return res.status(400).json({ message: 'This email is not registered. Try to register.' });
    }

    const result = await bcrypt.compare(password, existUser.password);
    if (result) {
      const payload = { email: existUser.email, id: existUser.id };
      jwt.sign(payload, process.env.JET_SECRET, (err, token) => {
        if (err) console.log(err);
        return res.status(200).json({ accessToken: token });
      });
    } else {
      res.status(400).json({ message: 'User information is not correct. Check your details.' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.post('/logout', (req, res) => {
  // Implement logout functionality if necessary
  res.status(200).json({ message: 'Logged out successfully' });
});

export default userRouter;

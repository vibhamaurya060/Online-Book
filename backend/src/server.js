import express from 'express';
import { config } from 'dotenv';
import { connectToDb } from './config/db.js';
import userRouter from './routes/userRoute.js';

import cors from 'cors';

config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('This is home route');
});

// User  route
app.use('/users', userRouter);


app.listen(PORT, async () => {
  await connectToDb();
  console.log(`Server is running at port ${PORT}`);
});

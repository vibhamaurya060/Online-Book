import express from 'express';
import dotenv from 'dotenv';
import { connectToDb } from './config/db.js';
import userRouter from './routes/userRoute.js';
import swaggerUi from 'swagger-ui-express';  // Correct import statement
import swaggerSpec from './config/swagger.js';
import errorHandler from './middlewares/errorHandler.js';
import connectMongoDB from './config/mongoose.js';
import bookRoutes from './routes/bookRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('This is home route');
});

// Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/users', userRouter);
app.use('/api', bookRoutes);
app.use('/api', orderRoutes);
app.use('/api', reviewRoutes);

// Error handler middleware
app.use(errorHandler);

// Connect to databases
(async () => {
  try {
    await connectToDb();
    await connectMongoDB();
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to databases:', error);
  }
})();

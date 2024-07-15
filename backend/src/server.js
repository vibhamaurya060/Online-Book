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
import orderDetailRoutes from './routes/orderDetailRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import logger from './config/logger.js';
import  expressWinston  from 'express-winston'
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

const server = createServer(app);
const io = new Server(server);
// Home route
app.get('/', (req, res) => {
  res.send('This is home route');

});

// app.get('/', (req, res) => {
 
//   res.sendFile('');
// });



io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('disconnect',()=>{
    console.log('A user disconnected:', socket.id);
  })
});

app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
}))


// Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/users', userRouter);
app.use('/api', bookRoutes);
app.use('/api', orderRoutes);
app.use('/api', reviewRoutes);
app.use('/api', customerRoutes);
app.use('/api', orderDetailRoutes);
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


export  {server, io};
// src/app.ts
import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import workoutRoutes from './routes/workout.routes';
import { cancelWorkoutController } from './controllers/workout.controller';
import { testimonialRoutes } from './routes/testimonial.routes';
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app: Application = express();
app.use(cors());  // This will allow all origins

// Middleware for parsing JSON requests
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes); 
app.use('/api/workouts', workoutRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

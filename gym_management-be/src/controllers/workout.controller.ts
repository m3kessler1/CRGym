import { Request, Response } from 'express';
import { WorkoutService } from '../services/workout.service';

const workoutService = new WorkoutService();

export const bookWorkoutController = async (req: Request, res: Response) => {
  try {
    const { userId, date, time, activity, coachId } = req.body;
    const result = await workoutService.bookWorkout({ userId, date, time, activity, coachId });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getUserWorkoutsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const workouts = await workoutService.getUserWorkouts(userId);
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

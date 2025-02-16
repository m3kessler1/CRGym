import { Request, Response } from 'express';
import { WorkoutService } from '../services/workout.service';

const workoutService = new WorkoutService();

export const bookWorkoutController = async (req: Request, res: Response) => {
  try {
    const { userId, date, time, activity, coachId, status } = req.body;
    const result = await workoutService.bookWorkout({ userId, date, time, activity, coachId, status });
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
    if ((error as Error).message === 'No workouts found for this user') {
      res.status(200).json([]);
    } else {
      res.status(400).json({ error: (error as Error).message });
    }
  }
};

export const cancelWorkoutController = async (req: Request, res: Response) => {
  console.log("cancel workout controller");
  try {
    const { workoutId } = req.params; // Assuming workoutId is passed as a URL parameter
    const updatedWorkout = await workoutService.cancelWorkout(workoutId);
    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const setWorkoutStatusToWaitingForFeedbackController = async (req: Request, res: Response) => {
  try {
    const { workoutId } = req.params; // Assuming workoutId is passed as a URL parameter
    const updatedWorkout = await workoutService.setWorkoutStatusToWaitingForFeedback(workoutId);
    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

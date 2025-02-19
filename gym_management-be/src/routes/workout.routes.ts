import express from 'express';
import { bookWorkoutController, getUserWorkoutsController, cancelWorkoutController, setWorkoutStatusToWaitingForFeedbackController } from '../controllers/workout.controller';

const router = express.Router();

router.post('/book', bookWorkoutController);
router.get('/:userId', getUserWorkoutsController);
router.patch('/:workoutId/status', cancelWorkoutController);
router.patch('/:workoutId/waiting-for-feedback', setWorkoutStatusToWaitingForFeedbackController);
export default router;

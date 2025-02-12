import express from 'express';
import { bookWorkoutController, getUserWorkoutsController } from '../controllers/workout.controller';

const router = express.Router();

router.post('/book', bookWorkoutController);
router.get('/:userId', getUserWorkoutsController);
export default router;

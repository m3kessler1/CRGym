import User, { IUser } from '../models/User';
import { Workout } from '../models/workout.model';

interface BookWorkoutRequest {
  userId: string;
  date: string;
  time: string;
  activity: string;
  coachId: string;
}

export class WorkoutService {
  public async bookWorkout({ userId, date, time, activity, coachId }: BookWorkoutRequest) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const coach = await User.findById(coachId);
    if (!coach) throw new Error('Coach not found');

    if (user.isCoach) throw new Error('Coaches cannot book workouts');
    if (!coach.isCoach) throw new Error('Selected user is not a coach');

    const existingWorkout = await Workout.findOne({ coachId, date, time });
    if (existingWorkout) throw new Error('Coach is unavailable at the selected time');

    const workout = new Workout({ userId, coachId, date, time, activity });
    await workout.save();

    return { message: 'Workout booked successfully', workout };
  }

  async getUserWorkouts(userId: string) {
    const workouts = await Workout.find({ userId });
    if (!workouts.length) {
      throw new Error('No workouts found for this user');
    }
    return workouts.map(workout => ({
      date: workout.date,
      time: workout.time,
      activity: workout.activity,
    }));
  }
}

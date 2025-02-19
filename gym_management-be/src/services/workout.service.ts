import User, { IUser } from '../models/User';
import { Workout } from '../models/workout.model';

interface BookWorkoutRequest {
  userId: string;
  date: string;
  time: string;
  activity: string;
  coachId: string;
  status: string;
}

export class WorkoutService {
  public async bookWorkout({ userId, date, time, activity, coachId, status }: BookWorkoutRequest) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const coach = await User.findById(coachId);
    if (!coach) throw new Error('Coach not found');

    if (user.isCoach) throw new Error('Coaches cannot book workouts');
    if (!coach.isCoach) throw new Error('Selected user is not a coach');

    const existingWorkout = await Workout.findOne({ coachId, date, time });
    if (existingWorkout) throw new Error('Coach is unavailable at the selected time');

    const workout = new Workout({ userId, coachId, date, time, activity, status });
    await workout.save();

    return { message: 'Workout booked successfully', workout };
  }

  async getUserWorkouts(userId: string) {
    const workouts = await Workout.find({ userId });
    if (!workouts.length) {
      throw new Error('No workouts found for this user');
    }

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    // Fetch coach details for each workout
    const workoutsWithDetails = await Promise.all(workouts.map(async workout => {
      const coach = await User.findById(workout.coachId);
      return {
        workoutId: workout._id,
        date: workout.date,
        time: workout.time,
        activity: workout.activity,
        status: workout.status,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        coachFirstName: coach ? coach.firstName : 'Unknown',
        coachLastName: coach ? coach.lastName : 'Unknown',
        coachId: coach ? coach._id : 'Unknown',
      };
    }));

    return workoutsWithDetails;
  }

  async cancelWorkout(workoutId: string, status: string) {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      throw new Error('Workout not found');
    }
    workout.status = status; // Change status to 'cancel'
    await workout.save();
    return workout;
  }

  async setWorkoutStatusToWaitingForFeedback(workoutId: string) {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      throw new Error('Workout not found');
    }
    workout.status = 'WAITING_FOR_FEEDBACK'; // Change status to 'WAITING_FOR_FEEDBACK'
    await workout.save();
    return workout;
  }
}

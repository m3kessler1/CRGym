import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  date: string; // Example: "2025-02-12"
  time: string; // Example: "10:00 AM"
  activity: string; // Example: "Strength Training"
  coachId: mongoose.Types.ObjectId;
  status: string; // Example: "pending"
}

const WorkoutSchema = new Schema<IWorkout>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  activity: { type: String, required: true },
  coachId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true }
});

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);

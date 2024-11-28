// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

// User interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  target: string;
  activity: string;
}

// Mongoose schema
const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    target: { type: String, required: true },
    activity: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;

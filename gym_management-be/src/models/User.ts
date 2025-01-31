// src/models/User.ts
import mongoose, { Document, Schema } from "mongoose";

// User interface
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isCoach: boolean;
  target: string;
  activity: string;
}

// Mongoose schema
const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isCoach: { type: Boolean, default: false },
    target: { type: String, required: true },
    activity: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;

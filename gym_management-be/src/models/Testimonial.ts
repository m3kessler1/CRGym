import mongoose, { Document, Schema } from "mongoose";

export interface ITestimonial extends Document {
  testimonial: string;
  userId: string;
  coachId: string;
  rating: number;
}

const testimonialSchema: Schema = new Schema({
  testimonial: { type: String, required: true },
  userId: { type: String, required: true },
  coachId: { type: String, required: true },
  rating: { type: Number, required: true },
});

export const Testimonial = mongoose.model<ITestimonial>("Testimonial", testimonialSchema);


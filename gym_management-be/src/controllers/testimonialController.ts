import { Request, Response } from "express";
import { Testimonial } from "../models/Testimonial";
import { ITestimonialDoc } from '../models/Testimonial';

class TestimonialController {
  public async createTestimonial(req: Request, res: Response): Promise<void> {
    try {
      const { feedback, firstName, lastName, coachId, rating, workoutId, isCoach } = req.body;
      const date = new Date().toISOString().split('T')[0];

      let doc = await Testimonial.findOne() || new Testimonial();
      const testimonialDoc = (doc?.toObject() || {}) as unknown as ITestimonialDoc;

      if (!testimonialDoc[coachId]) {
        testimonialDoc[coachId] = [];
      }

      testimonialDoc[coachId].push({
        firstName,
        lastName,
        date,
        rating,
        testimonial: feedback,
        workoutId,
        isCoach
      });

      await Testimonial.updateOne({}, testimonialDoc, { upsert: true });
      res.status(201).json({ message: "Testimonial created successfully" });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public async getTestimonial(req: Request, res: Response): Promise<void> {
    try {
      const { coachId } = req.params;
      const doc = await Testimonial.findOne({}, { 
        _id: 0, 
        __v: 0, 
        createdAt: 0, 
        updatedAt: 0 
      });
      const testimonialDoc = (doc?.toObject() || {}) as unknown as ITestimonialDoc;
      
      if (!testimonialDoc || !testimonialDoc[coachId]) {
        res.status(200).json({ [coachId]: [] });
        return;
      }

      res.status(200).json({ [coachId]: testimonialDoc[coachId] });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export const testimonialController = new TestimonialController();

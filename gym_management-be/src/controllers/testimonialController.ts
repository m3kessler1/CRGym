import { Request, Response } from "express";
import { Testimonial } from "../models/Testimonial";

    class TestimonialController {
  public async createTestimonial(req: Request, res: Response): Promise<void> {
    const { testimonial, userId, coachId, rating } = req.body;
    const newTestimonial = new Testimonial({ testimonial, userId, coachId, rating });
    await newTestimonial.save();
    res.status(201).json({ message: "Testimonial created successfully" });
  }

  public async getTestimonial(req: Request, res: Response): Promise<void> {
    const { coachId } = req.params;
    const testimonial = await Testimonial.find({ coachId });
    res.status(200).json({ testimonial });
  }
}

export const testimonialController = new TestimonialController();

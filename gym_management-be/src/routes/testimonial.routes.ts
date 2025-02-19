import { Router } from 'express';
import { testimonialController } from '../controllers/testimonialController';

const router = Router();

router.post('/', testimonialController.createTestimonial);
router.get('/:coachId', testimonialController.getTestimonial);

export const testimonialRoutes = router; 
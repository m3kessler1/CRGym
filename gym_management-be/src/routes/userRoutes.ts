// src/routes/userRoutes.ts
import express from "express";
import { userController } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", userController.registerUser.bind(userController));

router.post("/login", userController.loginUser.bind(userController));

router.get("/profile", protect, (req: any, res) => {
  res.status(200).json({
    message: `Hello, ${req.user?.name}`, // TypeScript should now recognize `req.user`
  });
});

router.put("/update/:email", userController.updateUser.bind(userController));
export default router;

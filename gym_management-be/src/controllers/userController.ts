// src/controllers/userController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import jwt from "jsonwebtoken";
import fs from "fs";

// Path to RSA keys
export class UserController {
  private privateKeyPath: string;

  constructor() {
    this.privateKeyPath = process.env.PRIVATE_KEY_PATH || "private-key.pem";
  }

  public async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        isCoach,
        target,
        activity,
      } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isCoach,
        target,
        activity,
      });
      const createdUser = await newUser.save();
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: createdUser._id,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          email: createdUser.email,
          isCoach: createdUser.isCoach,
          target: createdUser.target,
          activity: createdUser.activity,
        },
      });
    } catch (error) {
      res.status(500).json({ message: `Error: ${(error as Error).message}` });
    }
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "Invalid email or password" });
        return;
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid email or password" });
        return;
      }

      // Load private key to sign the JWT
      const privateKey = fs.readFileSync(this.privateKeyPath, "utf8");

      // Payload for the JWT
      const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      const token = jwt.sign(payload, privateKey, {
        algorithm: "RS256", // Use RSA signature with SHA-256 hashing
        expiresIn: "1h", // Token expires in 1 hour
      });

      // Return success response with token and user data
      res.status(200).json({
        message: "Logged in successfully",
        token, // Return the JWT token
        userData: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          activity: user.activity,
          target: user.target,
        },
      });
    } catch (error) {
      res.status(500).json({ message: `Error: ${(error as Error).message}` });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const { email } = req.params; // Assuming userId is passed as a URL parameter
    const updates = req.body; // Get the updates from the request body
     
    try {
      // Find the user by ID and update their information
      const updatedUser = await User.findOneAndUpdate({ email }, updates, {
        new: true, // Return the updated document
        runValidators: true, // Validate the updates against the model
      });


      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Return success response with updated user data
      res.status(200).json({
        message: "User updated successfully",
        user: {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          target: updatedUser.target,
          activity: updatedUser.activity,
        },
      });
    } catch (error) {
      res.status(500).json({ message: `Error: ${(error as Error).message}` });
    }
  }
}

// Export instance for routes
export const userController = new UserController();

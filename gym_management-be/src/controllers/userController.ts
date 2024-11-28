// src/controllers/userController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

// Path to RSA keys
const privateKeyPath = path.join(__dirname, '../../src/keys/private.pem');

// LogIn user and generate JWT token
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Load private key to sign the JWT
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

    // Payload for the JWT
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(payload, privateKey, {
      algorithm: 'RS256', // Use RSA signature with SHA-256 hashing
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Return success response with token
    res.status(200).json({
      message: 'Logged in successfully',
      token, // Return the JWT token
    });
  } catch (error) {
    res.status(500).json({ message: `Error: ${(error as Error).message}` });
  }
};



export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, target, activity } = req.body;
  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create the new user
    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
      target,
      activity,
    });

    // Save user to the database
    const createdUser = await newUser.save();
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Error: ${(error as Error).message}` });
  }
};

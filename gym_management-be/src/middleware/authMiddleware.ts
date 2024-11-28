// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { IUser } from '../models/User'; // Make sure to import the user interface

// Path to the public key
const publicKeyPath = path.join(__dirname, './keys/public.pem');

export const protect = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Load public key to verify the JWT
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

    // Verify token and decode user information
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as IUser;

    // Attach the user data from the decoded token to the request object
    req["user"] = decoded;

    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};

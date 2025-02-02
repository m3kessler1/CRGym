// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';

// Add at the top of the file
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const publicKey = fs.readFileSync(process.env.PUBLIC_KEY_PATH || 'public-key.pem');
      const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      
      // Add user from payload to request
      req.user = decoded;
      
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};

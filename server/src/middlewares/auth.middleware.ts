import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';
import { isTokenBlacklisted, verifyToken } from '../utils/auth.util';

// Middleware to check authentication and decode JWT token
// export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
//   const authorizationHeader = req.headers.authorization;

//   console.log('Authorization Header:', authorizationHeader); // Log the header

//   if (!authorizationHeader) {
//      res.status(401).json({ status: 'failed', message: 'Authorization header missing' });
//      return;
//   }

//   const token = authorizationHeader.split(' ')[1];

//   console.log('Token:', token); // Log the token

//   if (!token) {
//      res.status(401).json({ status: 'failed', message: 'Token missing' });
//      return;
//   }

//   const decodedUser = verifyToken(token); // Try to verify the token

//   if (!decodedUser) {
//      res.status(401).json({ status: 'failed', message: 'Token verification failed' });
//      return;
//   }

//   // Check if the token is blacklisted
//   if (isTokenBlacklisted(token)) {
//      res.status(401).json({ status: 'failed', message: 'Token is blacklisted' });
//      return;
//   }

//   req.user = decodedUser; // Attach user data to request
//   next(); // Proceed to the next middleware/route
// };


export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
     res.status(401).json({ status: 'failed', message: 'Authorization header missing' });
     return;
  }

  const token = authorizationHeader.split(' ')[1];

  if (!token) {
     res.status(401).json({ status: 'failed', message: 'Token missing' });
    return;
  }

  const decodedUser = verifyToken(token);

  if (!decodedUser) {
     res.status(401).json({ status: 'failed', message: 'Token verification failed' });
    return;
  }

  // Log the decoded user to ensure token is properly decoded
  console.log('Decoded User:', decodedUser);

  req.user = decodedUser; // Attach the user data to req.user
  next();
};


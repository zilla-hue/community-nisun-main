// src/types/express.d.ts
import { IUser } from '../models/user.model'; // Adjust path if necessary

declare global {
  namespace Express {
    interface AuthenticatedRequest extends Request {
      user?: IUser & { _id: string };  // Include user with role populated
    }
  }
}

import { Request } from 'express';
import { Session } from 'express-session'; // Import the Session type
import { SessionData } from 'express-session';

export interface AuthenticatedRequest extends Request {
  session: Session & Partial<SessionData>;  // Ensure session matches the expected type
  user?: any;  // For attaching user data later
}

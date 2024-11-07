// src/types/express-session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: any; // You can replace `any` with a more specific type if needed
  }
}

import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const secretKey = process.env.JWT_SECRET || 'fallbacksecret';

// In-memory blacklist (consider using a database for persistence)
const tokenBlacklist: Set<string> = new Set();

// Generates JWT token for user authentication
export const generateToken = (userId: string, role: string) => {
  const payload = { id: userId, role: role };
  return jwt.sign(payload, secretKey as string, { expiresIn: '1h' });
};


export const verifyToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, secretKey as string);
    if (isTokenBlacklisted(token)) {
      throw new Error('Token is blacklisted');
    }
    return decoded;
  } catch (error:any) {
    console.error('Token verification error:', error.message);
    return null;
  }
};



// Generates a secure random token and expiration time
export const generateResetOrVerificationToken = (): { token: string, expiresAt: Date } => {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 3600 * 1000);  // 1 hour expiration time
  return { token, expiresAt };
};



// Blacklist a token
export const blacklistToken = (token: string): void => {
  tokenBlacklist.add(token);
};

// Check if a token is blacklisted
export const isTokenBlacklisted = (token: string): boolean => {
  return tokenBlacklist.has(token);
};



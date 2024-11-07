// app.ts

import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
// import path from 'path';

import { errorHandler } from './middlewares/error.middleware';
import userRoutes from './routes/user.route';
import roleRoutes from './routes/role.route';

const app: Application = express();
// const __dirname = path.resolve();

// Cloudinary config  
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  redirect_to_secure: true,
  cname: process.env.CLOUDINARY_CNAME // Change this to your bucket name
});

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL, // Ensure this is set to your frontend URL (e.g., "http://localhost:5173")
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// middleware
app.use(cors(corsOptions)); // Use the cors middleware

// Other middleware
app.use(morgan("dev"));
app.use(express.json()); // Add this to parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Add this to parse URL-encoded requests
app.use(cookieParser()); // Add this for cookie parsing

// Routes
app.use('/api/v1/users', userRoutes); // Use the user routes
app.use('/api/v1/roles', roleRoutes); // Use the role routes

// // Serve frontend if in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

// Global error handler middleware
app.use(errorHandler);

export default app;

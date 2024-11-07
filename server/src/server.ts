// server.ts

require('dotenv').config(); // Load environment variables

import http from 'http';
import './config/db.connect'; // Ensure this file connects to MongoDB using the MONGO_URL
import app from './app';


const PORT = process.env.PORT || 8000;

// Server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




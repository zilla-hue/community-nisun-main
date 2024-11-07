"use strict";
// server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config(); // Load environment variables
const http_1 = __importDefault(require("http"));
require("./config/db.connect"); // Ensure this file connects to MongoDB using the MONGO_URL
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 8000;
// Server
const server = http_1.default.createServer(app_1.default);
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

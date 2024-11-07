"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = async () => {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        console.error("Error: MONGO_URL is not defined in environment variables.");
        return;
    }
    try {
        await mongoose_1.default.connect(mongoUrl);
        console.log("Database connection established");
    }
    catch (error) {
        console.log("Database connection error", error.message);
    }
};
dbConnect();

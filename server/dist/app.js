"use strict";
// app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cloudinary_1 = require("cloudinary");
// import path from 'path';
const error_middleware_1 = require("./middlewares/error.middleware");
const user_route_1 = __importDefault(require("./routes/user.route"));
const role_route_1 = __importDefault(require("./routes/role.route"));
const app = (0, express_1.default)();
// const __dirname = path.resolve();
// Cloudinary config  
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
    redirect_to_secure: true,
    cname: process.env.CLOUDINARY_CNAME // Change this to your bucket name
});
// middleware
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express_1.default.json()); // Add this to parse incoming JSON requests : request.body
app.use(express_1.default.urlencoded({ extended: true })); // Add this to parse 
app.use((0, cookie_parser_1.default)()); // Add this to
// Routes
app.use('/api/v1/users', user_route_1.default); // Use the user routes
app.use('/api/v1/roles', role_route_1.default); // Use the user routes
// // re-route 
// // Serve frontend if in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }
// Global error handler middleware
app.use(error_middleware_1.errorHandler);
exports.default = app;

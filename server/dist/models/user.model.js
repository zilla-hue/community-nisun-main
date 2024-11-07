"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
var MembershipStatus;
(function (MembershipStatus) {
    MembershipStatus["PENDING"] = "PENDING";
    MembershipStatus["ACTIVE"] = "ACTIVE";
    MembershipStatus["INACTIVE"] = "INACTIVE";
})(MembershipStatus || (MembershipStatus = {}));
const userSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    role: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Role', required: true },
    knowYourMember: { type: Boolean, default: false },
    membershipStatus: { type: String, enum: MembershipStatus, default: MembershipStatus.PENDING },
    duesPaid: { type: Boolean, default: false },
    regPaid: { type: Boolean, default: false },
    isSubscribed: { type: Boolean, default: false },
    isOnboarded: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false }, // Email not verified by default
    verificationToken: { type: String }, // Store the verification token
    verificationTokenExpires: { type: Date }, // Store the expiry of the verification token
    additionalDetails: { type: mongoose_1.Schema.Types.ObjectId, ref: 'AdditionalDetails' },
    orders: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Order' }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Like' }],
    session: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Session' }],
    children: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Child' }],
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);

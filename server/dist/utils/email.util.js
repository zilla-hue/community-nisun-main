"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = sendVerificationEmail;
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY); // Initialize Resend with your API key
async function sendVerificationEmail(email, verificationLink) {
    try {
        const response = await resend.emails.send({
            from: 'YourAppName <no-reply@yourapp.com>', // Customize sender details
            to: email,
            subject: 'Verify your email address',
            html: `
        <p>Thank you for signing up. Please click the link below to verify your email address:</p>
        <a href="${verificationLink}">Verify Email</a>
      `,
        });
        if (!response) {
            throw new Error('Failed to send verification email.');
        }
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending verification email.');
    }
}

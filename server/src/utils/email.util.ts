import { Resend } from 'resend';
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from './email-template';

const resend = new Resend(process.env.RESEND_API_KEY); // Initialize Resend with your API key
const domain = process.env.RESEND_COMPANY_DOMAIN; // Initialize Resend with your API key
const companyName = process.env.COMPANY; // Initialize Resend with your API key

export async function sendVerificationEmail(email: string, verificationLink: string) {
  try {
    const response = await resend.emails.send({
      from: `${companyName} <noreply@${domain}>`,  // Customize sender details
      to: email,
      subject: 'Verify your email address',
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationLink),

    });

    if (!response) {
      throw new Error('Failed to send verification email.');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending verification email.');
  }
}


export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
  try {
    const response = await resend.emails.send({
      from: `${companyName} <noreply@${domain}>`,  // Customize sender details
      to: email,
      subject: 'Password Reset',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });

    if (!response) {
      throw new Error('Failed to send verification email.');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending verification email.');
  }

 
};

export const sendResetSuccessEmail = async (email: string) => {

  try {
    const response = await resend.emails.send({
      from: `${companyName} <noreply@${domain}>`,  // Customize sender details
      to: email,
      subject: 'Password Reset Successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    if (!response) {
      throw new Error('Failed to send verification email.');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending verification email.');
  }
};


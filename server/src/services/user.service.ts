import { User } from '../models/user.model';
import { Role } from '../models/role.model'; // Import Role model
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/auth.util';
import { sendPasswordResetEmail, sendVerificationEmail } from '../utils/email.util'; // Import the email utility for sending verification
import crypto from 'crypto'; // For generating verification tokens
import { validateBooleanField } from '../utils/validator.util';

export class UserService {

  async createUser(userData: any) {
    // Check if phoneNumber is provided and not null
    if (!userData.phoneNumber || userData.phoneNumber === null) {
      throw new Error('Phone number is required and cannot be null.');
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error(`Email ${userData.email} already exists.`);
    }

    // Hash the password before saving the user
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.hashedPassword, saltRounds);

    // Generate a verification token
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationTokenExpires = Date.now() + 3600000; // Token expires in 1 hour

    // Check if the role is provided, otherwise find or create a "Guest" role
    let userRole = null;
    if (!userData.role) {
      userRole = await Role.findOne({ name: 'Guest' });

      if (!userRole) {
        // Create the "Guest" role if it doesn't exist
        userRole = new Role({
          name: 'Guest',
          dashboardView: 'guestView', // You can set the default dashboard view for the Guest role
        });

        await userRole.save(); // Save the "Guest" role to the database
      }
    } else {
      userRole = await Role.findById(userData.role);
    }

    // TypeScript narrowing ensures `userRole` is not null after the check
    if (!userRole) {
      throw new Error('Role not found.');
    }

    // Create a new user with the hashed password and verification token
    const user = new User({
      ...userData,
      hashedPassword: hashedPassword,
      isVerified: false, // Set to false initially
      verificationToken,
      verificationTokenExpires,
      role: userRole._id, // Assign the role (Guest by default if no role is provided)
    });

    // Save the user
    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    return user;
  }


  async getUserById(userId: string) {
    console.log('Querying database for user ID:', userId); // Log the ID being queried
    const user = await User.findById(userId).exec();
    console.log('Result from database:', user); // Log the result from the database
    return user;
  }


  async updateUser(userId: string, updateData: any) {
    return await User.findByIdAndUpdate(userId, updateData, { new: true }).exec();
  }

  async deleteUser(userId: string) {
    return await User.findByIdAndDelete(userId).exec();
  }

  async getAllUsers() {
    return await User.find().exec();
  }

  // Login method
  async login(email: string, password: string) {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    if (!user.isVerified) {
      throw new Error('Please verify your email to login.');
    }

    // Fetch the role name from the Role model
    const userRole = await Role.findById(user.role);
    if (!userRole) {
      throw new Error('User role not found');
    }

    const token = generateToken(user.id.toString(), userRole.name);

    user.lastLogin = new Date();
    await user.save();

    return { user, token };
  }



  // Assign role by name
  async assignRole(userId: string, roleName: string) {
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      throw new Error(`Role ${roleName} not found`);
    }

    return await User.findByIdAndUpdate(userId, { role: role._id }, { new: true }).exec();
  }

  // Activate a user
  async activateUser(userId: string) {
    return await User.findByIdAndUpdate(userId, { membershipStatus: 'ACTIVE' }, { new: true }).exec();
  }

  // Deactivate a user
  async deactivateUser(userId: string) {
    return await User.findByIdAndUpdate(userId, { membershipStatus: 'INACTIVE' }, { new: true }).exec();
  }

  // Pend a user's membership
  async pendUser(userId: string) {
    return await User.findByIdAndUpdate(userId, { membershipStatus: 'PENDING' }, { new: true }).exec();
  }

  // Update dues paid status
  async updateDuesPaid(userId: string, duesPaid: boolean) {
    return await User.findByIdAndUpdate(userId, { duesPaid }, { new: true }).exec();
  }

  // Update registration paid status
  async updateRegPaid(userId: string, regPaid: boolean) {

    // Proceed with the update if validation passes
    return await User.findByIdAndUpdate(userId, { regPaid: regPaid }, { new: true }).exec();
  }



  // Update subscription status
  async updateSubscription(userId: string, isSubscribed: boolean) {
    return await User.findByIdAndUpdate(userId, { isSubscribed }, { new: true }).exec();
  }

  // Update onboarding status
  async updateOnboarding(userId: string, isOnboarded: boolean) {
    return await User.findByIdAndUpdate(userId, { isOnboarded }, { new: true }).exec();
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    
    await user.save();

    // send email
    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

  }

  async resetPassword(token: string, password: string): Promise<void> {
    const user = await User.findOne({ resetPasswordToken: token }); // Adjust based on your token strategy
    if (!user) {
      throw new Error('Invalid or expired token');
    }

    user.hashedPassword = password; // Hash the password before saving
    user.resetPasswordToken = undefined; // Clear the token by setting it to undefined

    await user.save();
  }

  async verifyUser(code: string) {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpires: { $gt: new Date() }, // Token is still valid
    }).exec();

    if (!user) {
      throw new Error('Invalid or expired token.');
    }

    // Update user status to verified
    user.isVerified = true;
    user.verificationToken = undefined; // Remove the token
    user.verificationTokenExpires = undefined; // Remove token expiry

    await user.save();

    return user;
  }

}

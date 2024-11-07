import { create } from "zustand";
import axios from "axios";
import axiosInstance from "@/api/axios-instance";
import usersData from "@/data/users.json";

// Define the API URL based on the environment
const API_URL =
  import.meta.env.MODE === "development"
    ? "/api/v1/users"
    : "/api/v1/users";

axios.defaults.withCredentials = true;

// Define types for the Auth state and actions
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
  isVerified: boolean;
  createdAt: string; // Assuming createdAt is a string, adjust as needed
  lastLogin: string; // Assuming lastLogin is a string, adjust as needed
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;
  signup: (email: string, hashedPassword: string, firstName: string, lastName: string, phoneNumber: string, termsAccepted: boolean, privacyPolicyAccepted: boolean) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

// Create the Auth store
export const useUser = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, hashedPassword, firstName, lastName, phoneNumber, termsAccepted, privacyPolicyAccepted) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: String(usersData.users.length + 1),
        email,
        firstName,
        lastName,
        phoneNumber,
        termsAccepted,
        privacyPolicyAccepted,
        isVerified: false,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      usersData.users.push(newUser);
      set({ user: newUser, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ error: "Error signing up", isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axiosInstance.get(`${API_URL}/check-auth`);
      console.log("Auth check response:", response.data); // Log the response data
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error: any) {
      console.error("Authentication check failed:", error.response?.data); // Log the error
      set({ error: error.response?.data, isCheckingAuth: false, isAuthenticated: false });
    }
  },


  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = usersData.users.find(u => u.email === email && u.hashedPassword === password);
      
      if (!user) {
        throw new Error("Invalid credentials");
      }
      
      if (!user.isVerified) {
        throw new Error("Please verify your email to login.");
      }
      
      set({
        isAuthenticated: true,
        user,
        error: null,
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message || "Error logging in", isLoading: false });
      throw error;
    }
  },


  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error: any) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(`${API_URL}/verify/${code}`);
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error: any) {
      set({ error: error.response?.data?.error || "Error verifying email", isLoading: false });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(`${API_URL}/forgot-password`, { email });
      set({ message: response.data.message, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.error || "Error sending reset password email",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(`${API_URL}/reset-password/${token}`, { password });
      set({ message: response.data.message, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.error || "Error resetting password",
      });
      throw error;
    }
  },

}));

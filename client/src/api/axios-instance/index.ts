// import axios from "axios";


// const axiosInstance = axios.create({baseURL: "http://localhost:8000",});

// export default axiosInstance;

import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // This ensures cookies are sent with requests
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
    }
    return config; // Return the modified config
  },
  (error) => {
    return Promise.reject(error); // Handle any request errors
  }
);

export default axiosInstance;

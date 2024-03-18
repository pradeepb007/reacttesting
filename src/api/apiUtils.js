// utils/apiUtils.js
import axios from "axios";
import { BASE_API_URL } from "../utils/constants";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000, // adjust as needed
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log("Making request:", config);
    return config;
  },
  (error) => {
    // Do something with request error
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("Response received:", response);
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export const performApiRequest = async (url, method = "GET", data = null) => {
  try {
    const response = await api.request({
      url,
      method,
      data,
    });
    return handleResponse(response); // Return response data directly
  } catch (error) {
    throw handleError(error);
  }
};

export const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    console.log(response.data);
    return response.data;
  } else {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

export const handleError = (error) => {
  console.error("Failed to perform API request:", error);
  throw error;
};

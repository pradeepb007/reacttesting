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
    console.log("Making request:", config);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export const performApiRequest = async (
  url,
  method = "GET",
  data = null,
  responseType
) => {
  try {
    const response = await api.request({
      url,
      method,
      data,
      responseType,
    });
    return handleResponse(response);
  } catch (error) {
    throw handleError(error);
  }
};

export const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

export const handleError = (error) => {
  console.error("Failed to perform API request:", error);
  throw error;
};

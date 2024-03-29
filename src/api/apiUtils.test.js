// utils/apiUtils.test.js

import { performApiRequest, handleResponse, handleError } from "./apiUtils";

describe("API Utils", () => {
  // Mock axios
  const mockResponse = { data: { message: "Success" }, status: 200 };
  const mockError = new Error("Request failed");
  const mockApiRequest = jest.fn(() => Promise.resolve(mockResponse));
  const mockApi = { request: mockApiRequest };

  // Test performApiRequest function
  describe("performApiRequest", () => {
    it("should make an API request and return data on success", async () => {
      const data = await performApiRequest("/test");
      expect(data).toEqual(mockResponse.data);
    });

    it("should throw an error on API request failure", async () => {
      mockApiRequest.mockRejectedValueOnce(mockError);
      await expect(performApiRequest("/test")).rejects.toThrow(mockError);
    });
  });

  // Test handleResponse function
  describe("handleResponse", () => {
    it("should return response data if status is between 200 and 299", () => {
      const response = { data: { message: "Success" }, status: 200 };
      expect(handleResponse(response)).toEqual(response.data);
    });

    it("should throw an error if status is outside the range 200-299", () => {
      const response = { status: 400 };
      expect(() => handleResponse(response)).toThrowError(
        `HTTP error! Status: ${response.status}`
      );
    });
  });

  // Test handleError function
  describe("handleError", () => {
    it("should log and throw the error", () => {
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const error = new Error("Request failed");
      expect(() => handleError(error)).toThrowError(error);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to perform API request:",
        error
      );
      consoleErrorSpy.mockRestore();
    });
  });
});
import axios from "axios";
import { performApiRequest, handleResponse, handleError } from "./apiFile";
import { BASE_API_URL } from "../utils/constants";

jest.mock("axios");

const url = `${BASE_API_URL}/test`;

describe("API File Test", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should perform a GET request successfully", async () => {
    const responseData = { message: "GET request successful" };
    axios.request.mockResolvedValueOnce({ data: responseData });

    const response = await performApiRequest(url);
    expect(response).toEqual(responseData);
    expect(axios.request).toHaveBeenCalledWith({ url, method: "GET", data: null, responseType: undefined });
  });

  it("should handle error for failed GET request", async () => {
    axios.request.mockRejectedValueOnce({ response: { status: 404 } });

    await expect(performApiRequest(url)).rejects.toThrowError("HTTP error! Status: 404");
    expect(axios.request).toHaveBeenCalledWith({ url, method: "GET", data: null, responseType: undefined });
  });

  it("should perform a POST request successfully", async () => {
    const requestData = { name: "John" };
    const responseData = { message: "POST request successful" };
    axios.request.mockResolvedValueOnce({ data: responseData });

    const response = await performApiRequest(url, "POST", requestData);
    expect(response).toEqual(responseData);
    expect(axios.request).toHaveBeenCalledWith({ url, method: "POST", data: requestData, responseType: undefined });
  });

  it("should handle error for failed POST request", async () => {
    const requestData = { name: "John" };
    axios.request.mockRejectedValueOnce({ response: { status: 500 } });

    await expect(performApiRequest(url, "POST", requestData)).rejects.toThrowError("HTTP error! Status: 500");
    expect(axios.request).toHaveBeenCalledWith({ url, method: "POST", data: requestData, responseType: undefined });
  });

  it("should handle response", () => {
    const response = { status: 200, data: { message: "Success" } };
    expect(handleResponse(response)).toEqual(response.data);
  });

  it("should handle error", () => {
    const error = new Error("Request failed with status code 404");
    expect(() => handleError(error)).toThrowError(error);
  });
});
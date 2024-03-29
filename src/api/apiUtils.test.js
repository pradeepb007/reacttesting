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

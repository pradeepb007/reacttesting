import axios from "axios";
import { performApiRequest, handleResponse, handleError } from "./apiUtils";
import { BASE_API_URL } from "../utils/constants";

// Mock axios
jest.mock("axios");

describe("API Utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("performApiRequest", () => {
    it("should make a GET request to the correct URL", async () => {
      const mockResponseData = { id: 1, message: "welcome" };
      const mockUrl = "data";
      const mockBaseUrl = BASE_API_URL; // Replace with your BASE_API_URL
      axios.mockResolvedValueOnce({ status: 200, data: mockResponseData });

      const response = await performApiRequest(mockUrl, "GET");

      expect(axios).toHaveBeenCalledWith({
        url: `${mockBaseUrl}/${mockUrl}`,
        method: "GET",
        data: null,
        responseType: undefined,
      });
      expect(response).toEqual(mockResponseData);
    });

    it("should handle errors properly", async () => {
      const errorMessage = "Failed to fetch data";
      axios.mockRejectedValueOnce(new Error(errorMessage));

      await expect(performApiRequest("users/1", "GET")).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe("handleResponse", () => {
    it("should return response data if status is between 200 and 299", () => {
      const responseData = { id: 1, name: "John" };
      const response = { status: 200, data: responseData };

      expect(handleResponse(response)).toEqual(responseData);
    });

    it("should throw an error if status is not between 200 and 299", () => {
      const response = { status: 404 };

      expect(() => handleResponse(response)).toThrowError(
        `HTTP error! Status: ${response.status}`
      );
    });
  });

  describe("handleError", () => {
    it("should log the error and throw it", () => {
      const error = new Error("Failed to perform API request");
      console.error = jest.fn(); // Mock console.error

      expect(() => handleError(error)).toThrow(error);
      expect(console.error).toHaveBeenCalledWith(
        "Failed to perform API request:",
        error
      );
    });
  });
});

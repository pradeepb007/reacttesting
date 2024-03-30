// apiUtils.test.js
import axios from "axios";
import { performApiRequest, handleResponse, handleError } from "./apiUtils";

jest.mock("axios");

describe("API Utils", () => {
  beforeEach(() => {
    axios.create.mockReturnValue({
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
      request: jest.fn().mockResolvedValue({ data: "test", status: 200 }),
    });
  });

  describe("performApiRequest", () => {
    it("should perform a successful API request", async () => {
      const result = await performApiRequest("/test", "GET", null, "json");
      expect(result).toBe("test");
    });

    it("should throw an error if the request fails", async () => {
      axios.create.mockReturnValue({
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
        request: jest.fn().mockRejectedValue(new Error("Request failed")),
      });

      await expect(
        performApiRequest("/test", "GET", null, "json")
      ).rejects.toThrow("Request failed");
    });
  });

  describe("handleResponse", () => {
    it("should return the response data for a successful response", () => {
      const mockResponse = { data: "test", status: 200 };

      const result = handleResponse(mockResponse);

      expect(result).toBe("test");
    });

    it("should throw an error for an unsuccessful response", () => {
      const mockResponse = { data: "test", status: 400 };

      expect(() => handleResponse(mockResponse)).toThrow(
        "HTTP error! Status: 400"
      );
    });
  });

  describe("handleError", () => {
    it("should throw the provided error", () => {
      const mockError = new Error("Request failed");

      expect(() => handleError(mockError)).toThrow("Request failed");
    });
  });
});

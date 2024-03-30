import axios from "axios";
import { performApiRequest } from "./apiUtils";

jest.mock("axios");

describe("apiUtils", () => {
  describe("performApiRequest", () => {
    it("makes a successful API request", async () => {
      const response = { data: "test", status: 200 };
      axios.request.mockResolvedValueOnce(response);

      const result = await performApiRequest("/test", "GET", null, "json");

      expect(axios.request).toHaveBeenCalledWith({
        url: "/test",
        method: "GET",
        data: null,
        responseType: "json",
      });
      expect(result).toBe("test");
    });

    it("throws an error for a failed API request", async () => {
      const error = new Error("Request failed");
      axios.request.mockRejectedValueOnce(error);

      await expect(
        performApiRequest("/test", "GET", null, "json")
      ).rejects.toThrow("Request failed");
      expect(axios.request).toHaveBeenCalledWith({
        url: "/test",
        method: "GET",
        data: null,
        responseType: "json",
      });
    });
  });

  describe("axios interceptors", () => {
    it("logs request and response info", () => {
      const consoleSpy = jest.spyOn(console, "log");

      axios.interceptors.request.handlers[0].fulfilled({ url: "/test" });
      expect(consoleSpy).toHaveBeenCalledWith("Making request:", {
        url: "/test",
      });

      axios.interceptors.response.handlers[0].fulfilled({ data: "test" });
      expect(consoleSpy).toHaveBeenCalledWith("Response received:", {
        data: "test",
      });

      consoleSpy.mockRestore();
    });

    it("logs request and response errors", () => {
      const consoleErrorSpy = jest.spyOn(console, "error");

      axios.interceptors.request.handlers[0].rejected("Request error");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Request error:",
        "Request error"
      );

      axios.interceptors.response.handlers[0].rejected("Response error");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Response error:",
        "Response error"
      );

      consoleErrorSpy.mockRestore();
    });
  });
});

import axios from "axios";
import { performApiRequest, handleResponse } from "./apiUtils";

jest.mock("axios");

describe("apiUtils", () => {
  describe("performApiRequest", () => {
    it("makes a successful API request", async () => {
      const response = { data: "test", status: 200 }; // Ensure response includes status property
      axios.create.mockReturnValueOnce({
        request: jest.fn().mockResolvedValueOnce(response),
      });

      const result = await performApiRequest("/test", "GET", null, "json");

      expect(axios.create).toHaveBeenCalled();
      expect(axios.create().request).toHaveBeenCalledWith({
        url: "/test",
        method: "GET",
        data: null,
        responseType: "json",
      });
      expect(result).toBe("test");
    });

    it("throws an error for a failed API request", async () => {
      const error = new Error("Request failed");
      axios.create.mockReturnValueOnce({
        request: jest.fn().mockRejectedValueOnce(error),
      });

      await expect(
        performApiRequest("/test", "GET", null, "json")
      ).rejects.toThrow("Request failed");
      expect(axios.create).toHaveBeenCalled();
      expect(axios.create().request).toHaveBeenCalledWith({
        url: "/test",
        method: "GET",
        data: null,
        responseType: "json",
      });
    });
  });

  describe("handleResponse", () => {
    it("returns response data for successful status", () => {
      const response = { data: "test", status: 200 };
      const result = handleResponse(response);
      expect(result).toBe("test");
    });

    it("throws an error for non-successful status", () => {
      const response = { status: 404 };
      expect(() => handleResponse(response)).toThrow("HTTP error! Status: 404");
    });
  });
});

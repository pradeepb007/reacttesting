// utils/apiUtils.test.js

import { performApiRequest } from "./apiUtils";
import axios from "axios";

// Mock axios
jest.mock("axios");

describe("performApiRequest function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("performs API request successfully", async () => {
    const responseData = { id: 1, name: "John Doe" };
    axios.request.mockResolvedValueOnce({ data: responseData });

    const response = await performApiRequest("/users");

    expect(response).toEqual(responseData);
    expect(axios.request).toHaveBeenCalledWith({
      url: "/users",
      method: "GET",
      data: null,
    });
  });

  it("handles API request failure", async () => {
    const errorMessage = "Failed to perform API request";
    axios.request.mockRejectedValueOnce(new Error(errorMessage));

    await expect(performApiRequest("/users")).rejects.toThrow(errorMessage);
    expect(axios.request).toHaveBeenCalledWith({
      url: "/users",
      method: "GET",
      data: null,
    });
  });
});

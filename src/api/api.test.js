import { getUsers } from "./api";

jest.mock("../utils/apiUtils", () => ({
  performApiRequest: jest.fn(),
}));

describe("getUsers function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches users from the API successfully", async () => {
    // Mock successful API response
    const mockApiResponse = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
    ];
    require("../utils/apiUtils").performApiRequest.mockResolvedValue(
      mockApiResponse
    );

    // Call getUsers function
    const users = await getUsers();

    // Check if performApiRequest was called with the correct argument
    expect(require("../utils/apiUtils").performApiRequest).toHaveBeenCalledWith(
      "/users"
    );

    // Check if getUsers returns the expected data
    expect(users).toEqual(mockApiResponse);
  });

  it("throws an error if API request fails", async () => {
    // Mock API request failure
    const errorMessage = "Failed to fetch users";
    require("../utils/apiUtils").performApiRequest.mockRejectedValue(
      new Error(errorMessage)
    );

    // Call getUsers function and expect it to throw an error
    await expect(getUsers()).rejects.toThrow(errorMessage);
  });
});

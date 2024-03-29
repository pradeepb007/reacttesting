import { getApiInstance, performApiRequest, handleResponse, handleError } from "./apiFile";
import { BASE_API_URL } from "../utils/constants";

const api = getApiInstance(); // Get the API instance

const url = `${BASE_API_URL}/test`;

describe("API File Test", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should log request before making the request", async () => {
    const requestData = { name: "John" };
    api.request = jest.fn().mockResolvedValueOnce({ data: {} });

    console.log = jest.fn(); // Mock console.log
    await performApiRequest(url, "POST", requestData);
    expect(console.log).toHaveBeenCalledWith("Making request:", expect.any(Object));
  });

  // Write other test cases similarly...
});
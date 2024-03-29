import axios from 'axios';
import { performApiRequest, handleResponse, handleError } from './api'; // Update the path accordingly

// Mocking the axios instance
jest.mock('axios');

describe('API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mocking interceptor functions
  const mockRequestInterceptor = jest.fn();
  const mockResponseInterceptor = jest.fn();
  axios.create.mockImplementation(() => ({
    interceptors: {
      request: { use: mockRequestInterceptor },
      response: { use: mockResponseInterceptor },
    },
    request: jest.fn(),
  }));

  // Test performApiRequest function
  it('performs API request successfully', async () => {
    const responseData = { data: 'mocked response' };
    const url = '/test';
    axios.request.mockResolvedValueOnce({ data: responseData });

    const response = await performApiRequest(url);
    expect(response).toEqual(responseData);
    expect(axios.request).toHaveBeenCalledWith({ url, method: 'GET', data: null, responseType: undefined });
  });

  it('handles error in performApiRequest function', async () => {
    const url = '/test';
    axios.request.mockRejectedValueOnce(new Error('Request failed'));

    await expect(performApiRequest(url)).rejects.toThrowError('Request failed');
  });

  // Test handleResponse function
  it('handles successful response', () => {
    const response = { status: 200, data: 'success' };
    expect(handleResponse(response)).toEqual('success');
  });

  it('handles error response', () => {
    const response = { status: 404 };
    expect(() => handleResponse(response)).toThrowError('HTTP error! Status: 404');
  });

  // Test handleError function
  it('handles error in handleError function', () => {
    const error = new Error('Test error');
    console.error = jest.fn(); // Mock console.error

    expect(() => handleError(error)).toThrow(error);
    expect(console.error).toHaveBeenCalledWith('Failed to perform API request:', error);
  });

  // Test interceptor functions
  it('registers request interceptor', () => {
    expect(mockRequestInterceptor).toHaveBeenCalled();
  });

  it('registers response interceptor', () => {
    expect(mockResponseInterceptor).toHaveBeenCalled();
  });
});
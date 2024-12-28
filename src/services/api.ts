// Base API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function handleResponse<T>(response: Response | any): Promise<T> {
  if (response instanceof Response && !response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occured.'}));
    throw new ApiError(response.status, error.message);
  } else if(response instanceof Object && response?.response?.status) { 
    throw new ApiError(response.response.status, response.response.data?.message || 'An error occured');
  }
  return response?.data || response;
}
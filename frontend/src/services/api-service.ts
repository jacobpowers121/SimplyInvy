// A simple wrapper for API calls using fetch.
// You can later expand this to include more methods, error handling, and integration with your backend.

const API_BASE_URL = 'http://localhost:3000';

export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

// Example usage for other endpoints can be added here.

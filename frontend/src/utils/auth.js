// auth.js
const TOKEN_KEY = "jwt_token";

// Save token to localStorage
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// Example login function (replace with actual API call)
export const login = async (email, password) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      setToken(data.token);
      return { success: true, token: data.token };
    } else {
      return { success: false, message: data.message || "Login failed" };
    }
  } catch (error) {
    return { success: false, message: error.message || "Network error" };
  }
};

// Example logout function
export const logout = () => {
  removeToken();
};

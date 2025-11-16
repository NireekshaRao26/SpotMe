const TOKEN_KEY = "jwt_token";

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

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

export const logout = () => {
  removeToken();
};

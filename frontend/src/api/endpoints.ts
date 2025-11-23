import { api } from "./axios";

export const registerUser = (payload: any) => {
  const form = new URLSearchParams();
  form.append("username", payload.username);
  form.append("password", payload.password);
  form.append("role", payload.role);

  return api.post("/auth/register", form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const loginUser = (payload: any) => {
  const form = new URLSearchParams();
  form.append("username", payload.username);
  form.append("password", payload.password);

  return api.post("/auth/login", form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const logoutUser = () => {
  return api.post("/auth/logout");
};

export const createEvent = (name: string) => {
  const form = new FormData();
  form.append("name", name);

  return api.post("/events/create", form, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const listHostEvents = () => api.get("/events/list");

export const uploadPhoto = (file: File, eventCode: string) => {
  const form = new FormData();
  form.append("file", file);
  form.append("event_code", eventCode);

  return api.post("/photos/upload", form);
};

export const searchPhotos = (file: File, eventCode: string) => {
  const form = new FormData();
  form.append("file", file);
  form.append("event_code", eventCode);

  return api.post("/photos/search", form);
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getHostStats = () => api.get("/events/stats");

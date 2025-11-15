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

export const createEvent = (payload: any) =>
  api.post("/events/create", payload);

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

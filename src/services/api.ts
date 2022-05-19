import axios from "axios";
import AuthValues from "../interfaces/AuthValues";

export const instance = axios.create({
  baseURL: "http://localhost:5000",
});

export const createAuthHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const signUp = async (newUser: AuthValues) =>
  instance.post("/sign-up", newUser);

export const login = async (loginUser: AuthValues) =>
  instance.post("/log-in", loginUser);

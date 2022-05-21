import axios from "axios";
import AuthValues from "../interfaces/AuthValues";

const baseURL =
  process.env.REACT_APP_API_URL === "prod"
    ? "http://ec2-3-95-67-212.compute-1.amazonaws.com/"
    : "http://localhost:5000";

export const instance = axios.create({
  baseURL,
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
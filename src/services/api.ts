import axios from "axios";
import AuthValues from "../interfaces/AuthValues";
import { BudgetRequest } from "../interfaces/BudgetValues";

const baseURL =
  process.env.REACT_APP_API_URL === "dev"
    ? "http://localhost:5000"
    : "https://barmanager-bitt.herokuapp.com/";

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
  instance.post("/signup", newUser);

export const login = async (loginUser: AuthValues) =>
  instance.post("/login", loginUser);

export const getCocktails = async () => instance.get("/cocktails");

export const getEventCategories = async () =>
  instance.get("/budgets/categories");

export const requestBudget = async (body: BudgetRequest, token: string) =>
  instance.post("/budgets", body, createAuthHeader(token));

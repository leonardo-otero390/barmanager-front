import { useContext } from "react";
import { BudgetContext } from "../contexts/BudgetContext";

export default function useBudget() {
  const budgetContext = useContext(BudgetContext);
  if (!budgetContext) {
    throw new Error("useBudget must be used inside a AlertContext Provider");
  }

  return budgetContext;
}

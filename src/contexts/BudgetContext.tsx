import { createContext, useState } from "react";
import { BudgetValues } from "../interfaces/BudgetValues";
import Cocktail from "../interfaces/Cocktail";

interface IBudgetContext {
  values: BudgetValues;
  cocktails: Cocktail[];
  setValues: React.Dispatch<React.SetStateAction<BudgetValues>>;
  setCocktails: React.Dispatch<React.SetStateAction<Cocktail[]>>;
}

export const BudgetContext = createContext<IBudgetContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export function BudgetProvider({ children }: Props) {
  const [values, setValues] = useState<BudgetValues>({
    categoryId: 0,
    guests: 0,
    cocktail1: 0,
    cocktail2: 0,
    cocktail3: 0,
    cocktail4: 0,
  });
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  return (
    <BudgetContext.Provider
      value={{ values, setValues, cocktails, setCocktails }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

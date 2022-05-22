import { createContext, useState } from "react";
import BudgetValues from "../interfaces/BudgetValues";
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
    eventCategory: "",
    guests: 0,
    cocktail1Id: 0,
    cocktail2Id: 0,
    cocktail3Id: 0,
    cocktail4Id: 0,
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

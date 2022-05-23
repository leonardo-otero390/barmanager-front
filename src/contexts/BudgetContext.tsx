import { createContext, useState } from "react";
import { BudgetValues } from "../interfaces/BudgetValues";
import Category from "../interfaces/Category";
import Cocktail from "../interfaces/Cocktail";

interface IBudgetContext {
  resetValues: () => void;
  values: BudgetValues;
  cocktails: Cocktail[];
  categories: Category[];
  setValues: React.Dispatch<React.SetStateAction<BudgetValues>>;
  setCocktails: React.Dispatch<React.SetStateAction<Cocktail[]>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export const BudgetContext = createContext<IBudgetContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export function BudgetProvider({ children }: Props) {
  const initialValues: BudgetValues = {
    categoryId: 0,
    guests: 0,
    cocktail1: 0,
    cocktail2: 0,
    cocktail3: 0,
    cocktail4: 0,
  };
  const [values, setValues] = useState<BudgetValues>(initialValues);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const resetValues = () => setValues(initialValues);

  return (
    <BudgetContext.Provider
      value={{
        resetValues,
        values,
        setValues,
        cocktails,
        setCocktails,
        categories,
        setCategories,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

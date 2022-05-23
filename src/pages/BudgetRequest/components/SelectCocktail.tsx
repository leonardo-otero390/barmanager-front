import { useEffect, useState } from "react";
import useBudget from "../../../hooks/useBudget";
import { BudgetValues } from "../../../interfaces/BudgetValues";
import Cocktail from "../../../interfaces/Cocktail";
import Select from "./Select";

interface Props {
  stateKey: keyof BudgetValues;
}

export default function SelectCocktail({ stateKey: key }: Props) {
  const [selected, setSelected] = useState<Cocktail | null>(null);
  const [availableList, setAvailableList] = useState<Cocktail[]>([]);
  const { values, setValues, cocktails } = useBudget();
  useEffect(() => {
    const cocktail = cocktails.find((c) => c.id === values[key]);
    if (cocktail) setSelected(cocktail);
    setAvailableList(
      cocktails.filter(
        (c) =>
          c.id !== values.cocktail1 &&
          c.id !== values.cocktail2 &&
          c.id !== values.cocktail3 &&
          c.id !== values.cocktail4
      )
    );
  }, [key, cocktails, values, availableList.length, selected]);

  const handleSelection = (id: number) => {
    setValues({ ...values, [key]: id });
  };

  return (
    <Select
      handleSelection={handleSelection}
      availableList={availableList}
      selected={selected}
      headerText="Escolha um drink"
    />
  );
}

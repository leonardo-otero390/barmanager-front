import { useEffect, useState } from "react";
import useBudget from "../../../hooks/useBudget";
import Category from "../../../interfaces/Category";
import Select from "./Select";

export default function SelectCategory() {
  const [selected, setSelected] = useState<Category | null>(null);
  const [availableList, setAvailableList] = useState<Category[]>([]);
  const { values, setValues, categories } = useBudget();
  useEffect(() => {
    const cocktail = categories.find((c) => c.id === values.categoryId);
    if (cocktail) setSelected(cocktail);
    setAvailableList(categories.filter((c) => c.id !== values.categoryId));
  }, [values, availableList.length, selected, categories]);

  const handleSelection = (id: number) => {
    setValues({ ...values, categoryId: id });
  };

  return (
    <Select
      handleSelection={handleSelection}
      availableList={availableList}
      selected={selected}
      headerText="Event category"
    />
  );
}

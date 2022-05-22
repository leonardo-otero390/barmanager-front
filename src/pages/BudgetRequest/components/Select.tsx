import { useEffect, useState } from "react";
import styled from "styled-components";
import useBudget from "../../../hooks/useBudget";
import BudgetValues from "../../../interfaces/BudgetValues";
import Cocktail from "../../../interfaces/Cocktail";

interface Props {
  stateKey: keyof BudgetValues;
}

export default function Select({ stateKey: key }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Cocktail | null>(null);
  const [availableList, setAvailableList] = useState<Cocktail[]>([]);
  const { values, setValues, cocktails } = useBudget();
  useEffect(() => {
    const cocktail = cocktails.find((c) => c.id === values[key]);
    if (cocktail) setSelected(cocktail);
    setAvailableList(
      cocktails.filter(
        (c) =>
          c.id !== values.cocktail1Id &&
          c.id !== values.cocktail2Id &&
          c.id !== values.cocktail3Id &&
          c.id !== values.cocktail4Id
      )
    );
  }, [key, cocktails, values]);

  const handleSelection = (id: number) => {
    setOpen(false);
    setValues({ ...values, [key]: id });
  };

  return (
    <Container>
      <SelectHeader onClick={() => setOpen(!open)}>
        {selected ? selected.name : "Escolha um drink"}
      </SelectHeader>
      <List open={open && !!availableList.length}>
        {availableList.map((item, index) => (
          <li key={index} onClick={() => handleSelection(item.id)}>
            {item.name}
          </li>
        ))}
      </List>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const SelectHeader = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  height: 72px;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 10px;
  border: none;
  padding: 0 16px;
`;

const List = styled.ul<{ open: boolean }>`
  margin-top: -8px;
  display: ${(props) => (props.open ? "block" : "none")};
  li {
    font-size: 16px;
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    background-color: #f5f5f5;
    border: none;
    padding: 0 16px;
  }
`;

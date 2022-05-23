import { useEffect, useState } from "react";
import styled from "styled-components";

interface Option {
  id: number;
  name: string;
}

interface Props {
  handleSelection: (id: number) => void;
  availableList: Option[];
  selected: Option | null;
  headerText: string;
}

export default function Select({
  handleSelection,
  availableList,
  selected,
  headerText,
}: Props) {
  const [open, setOpen] = useState(false);
  const [empty, setEmpty] = useState(false);
  useEffect(() => {
    setEmpty(!availableList.length && !selected);
  }, [availableList.length, selected]);

  return (
    <Container>
      <SelectHeader onClick={() => setOpen(!open)} empty={empty}>
        {selected
          ? selected.name
          : empty
          ? "Sem opções disponíveis"
          : headerText}
      </SelectHeader>
      <List open={open && !!availableList.length}>
        {availableList.map((item, index) => (
          <li key={index} onClick={() => {
            setOpen(false);
            handleSelection(item.id)}}>
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

const SelectHeader = styled.div<{ empty: boolean }>`
  font-size: 16px;
  display: flex;
  align-items: center;
  height: 72px;
  width: 100%;
  background-color: ${({ empty }) => (empty ? "grey" : "#f5f5f5")};
  border-radius: 10px;
  border: none;
  padding: 0 16px;
`;

const List = styled.ul<{ open: boolean }>`
  margin-top: -8px;
  display: ${({ open }) => (open ? "block" : "none")};
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

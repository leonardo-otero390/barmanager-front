import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import useAlert from "../../hooks/useAlert";
import { Button, Input, FormContainer as Container } from "../../styles/style";
import { BudgetValues } from "../../interfaces/BudgetValues";
import SelectCocktail from "./components/SelectCocktail";
import useBudget from "../../hooks/useBudget";

export default function BudgetRequest() {
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const [loading, setLoading] = useState(false);
  const { values, setValues, setCocktails } = useBudget();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getCocktails()
      .then((res) => setCocktails(res.data))
      .catch((err) =>
        setMessage({
          type: "error",
          text: "Houve um problema ao carregar os drinks",
        })
      );
  }, [setCocktails, setMessage]);

  const handleChange =
    (prop: keyof BudgetValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!values.cocktail1) {
      setMessage({
        type: "error",
        text: "Escolha pelo menos um drink",
      });
      return setLoading(false);
    }
    if (!token) {
      setMessage({
        type: "error",
        text: "Você precisa estar logado para solicitar um orçamento",
      });
      navigate("/login");
      return setLoading(false);
    }
    setMessage({
      type: "error",
      text: "Funcionalidade em desenvolvimento",
    });
    setLoading(false);
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Input
        placeholder="Tipo de evento"
        required
        type="text"
        onChange={handleChange("categoryId")}
      />
      <Input
        placeholder="Quantidade de convidados"
        required
        type="number"
        onChange={handleChange("guests")}
      />
      <SelectCocktail stateKey={"cocktail1"} />
      {values.cocktail1 ? <SelectCocktail stateKey={"cocktail2"} /> : null}
      {values.cocktail2 ? <SelectCocktail stateKey={"cocktail3"} /> : null}
      {values.cocktail3 ? <SelectCocktail stateKey={"cocktail4"} /> : null}
      <Button type="submit" disabled={loading}>
        {loading ? "Carregando" : "SOLICITAR ORÇAMENTO"}
      </Button>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import useAlert from "../../hooks/useAlert";
import { Button, Input, FormContainer as Container } from "../../styles/style";
import {
  BudgetRequest as Request,
  BudgetValues,
} from "../../interfaces/BudgetValues";
import SelectCocktail from "./components/SelectCocktail";
import useBudget from "../../hooks/useBudget";
import SelectCategory from "./components/SelectCategory";

export default function BudgetRequest() {
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const [loading, setLoading] = useState(false);
  const { resetValues, values, setValues, setCocktails, setCategories } =
    useBudget();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getEventCategories()
      .then((res) => setCategories(res.data))
      .catch((err) =>
        setMessage({
          type: "error",
          text: "Houve um problema ao carregar os tipos de evento",
        })
      );
    api
      .getCocktails()
      .then((res) => setCocktails(res.data))
      .catch((err) =>
        setMessage({
          type: "error",
          text: "Houve um problema ao carregar os drinks",
        })
      );
  }, [setCategories, setCocktails, setMessage]);

  const handleChange =
    (prop: keyof BudgetValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!values.categoryId) {
      setMessage({
        type: "error",
        text: "Selecione o tipo de evento",
      });
      return setLoading(false);
    }
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

    const bodyRequest: Request = {
      categoryId: values.categoryId,
      guests: Number(values.guests),
      cocktails: [],
    };

    if (values.cocktail1) {
      bodyRequest.cocktails.push(values.cocktail1);
    }
    if (values.cocktail2) {
      bodyRequest.cocktails.push(values.cocktail2);
    }
    if (values.cocktail3) {
      bodyRequest.cocktails.push(values.cocktail3);
    }
    if (values.cocktail4) {
      bodyRequest.cocktails.push(values.cocktail4);
    }

    api
      .requestBudget(bodyRequest, token)
      .then(() => {
        setMessage({
          type: "success",
          text: "Orçamento solicitado com sucesso entraremos em contato em breve",
        });
        resetValues();
      })
      .catch(() => {
        setMessage({
          type: "error",
          text: "Houve um error ao solicitar o orçamento",
        });
      });
    setLoading(false);
  };

  return (
    <Container onSubmit={handleSubmit}>
      <SelectCategory />
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

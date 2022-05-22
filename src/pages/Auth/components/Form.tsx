import AuthValues from "../../../interfaces/AuthValues";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../../services/api";
import AuthTypes from "../../../interfaces/AuthTypes";
import useAuth from "../../../hooks/useAuth";
import useAlert from "../../../hooks/useAlert";
import { Button, Input,FormContainer as Container } from "../../../styles/style";

interface ValuesState extends AuthValues {
  name: string;
  phone: string;
  confirmPassword: string;
}

export default function Form({ type }: AuthTypes) {
  const { logIn } = useAuth();
  const { setMessage } = useAlert();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<ValuesState>({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange =
    (prop: keyof ValuesState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (type === "signup") {
      if (values.password !== values.confirmPassword) {
        return alert("As senhas não coincidem.");
      }
      const { confirmPassword, ...body } = values;
      api
        .signUp(body)
        .then(() => {
          setMessage({
            type: "success",
            text: "Cadastro realizado com sucesso",
          });
          navigate("/");
        })
        .catch((err) => {
          if (err.response.status === 409)
            return alert("Este email já está cadastrado.");
          alert(err.response.data);
        });
    } else {
      api
        .login({ email: values.email, password: values.password })
        .then((res) => {
          logIn(res.data.token);
          setMessage({ type: "success", text: "Login realizado com sucesso" });
          navigate("/");
        })
        .catch((err) => {
          if (err.response.status === 401) alert("Email ou senha incorretos");
        });
    }
    setLoading(false);
  };

  return (
    <Container onSubmit={handleSubmit}>
      {type === "signup" ? (
        <Input
          placeholder="Nome"
          required
          type="text"
          onChange={handleChange("name")}
        />
      ) : null}

      <Input
        placeholder="Email"
        required
        type="text"
        onChange={handleChange("email")}
      />

      {type === "signup" ? (
        <Input
          placeholder="Telefone com DDD sem hífen"
          type="number"
          onChange={handleChange("phone")}
        />
      ) : null}

      <Input
        placeholder="Senha"
        required
        type="password"
        onChange={handleChange("password")}
        value={values.password}
      />
      {type === "signup" ? (
        <Input
          placeholder="Confirmar senha"
          required
          type="password"
          onChange={handleChange("confirmPassword")}
          value={values.confirmPassword}
        />
      ) : null}

      <Button type="submit" disabled={loading}>
        {loading ? "Carregando" : type === "login" ? "ENTRAR" : "CADASTRAR"}
      </Button>
    </Container>
  );
}

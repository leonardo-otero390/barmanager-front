import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Form from "./components/Form";
import useAuth from "../../hooks/useAuth";
import AuthTypes from "../../interfaces/AuthTypes";

export default function AuthPage({ type }: AuthTypes) {
  const token = localStorage.getItem("token");
  const { logIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      logIn(token);
      navigate("/request");
    }
  }, [token, navigate, logIn]);

  const texts = {
    linkText:
      type === "login"
        ? "Não tem uma conta? Cadastre-se"
        : "Já tem uma conta? Faça login",
    linkTo: type === "login" ? "/cadastro" : "/",
  };

  return (
    <Container>
      <Form type={type} />
      <Link to={texts.linkTo}>{texts.linkText}</Link>
    </Container>
  );
}

const Container = styled.main`
  padding: 0 16px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  a {
    margin-top: 16px;
    color: #f4ede8;
    font-weight: bold;
  }
`;

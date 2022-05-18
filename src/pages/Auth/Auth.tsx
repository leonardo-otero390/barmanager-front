import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Form from "./components/Form";
import useAuth from "../../hooks/useAuth";
import AuthTypes from "../../interfaces/AuthTypes";
import Header from "../../components/Header";

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
  return (
    <Container>
      <Header />
      <Form type={type} />
    </Container>
  );
}

const Container = styled.main`
  width: 80%;
  height: 100%;
  max-width: 464px;
  padding: 64px 0;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

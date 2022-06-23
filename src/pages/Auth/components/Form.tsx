import AuthValues from "../../../interfaces/AuthValues";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../../services/api";
import AuthTypes from "../../../interfaces/AuthTypes";
import useAuth from "../../../hooks/useAuth";
import useAlert from "../../../hooks/useAlert";
import {
  Button,
  Input,
  FormContainer as Container,
} from "../../../styles/style";

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
        setMessage({ type: "error", text: "Passwords don't match." });
        return setLoading(false);
      }

      if (values.phone.length && values.phone.length !== 11) {
        setMessage({ type: "error", text: "Phone number must be 11 digits or empty." });
        return setLoading(false);
      }
      const { confirmPassword, ...body } = values;
      api
        .signUp(body)
        .then(() => {
          setMessage({
            type: "success",
            text: "Successfully signed up. Please log in.",
          });
          navigate("/login");
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setMessage({ type: "error", text: "Email already in use." });
          } else {
            setMessage({
              type: "error",
              text: "An error occurred.Please try again.",
            });
          }
        });
    } else {
      api
        .login({ email: values.email, password: values.password })
        .then((res) => {
          logIn(res.data.token);
          setMessage({ type: "success", text: "Login successfully" });
          navigate("/");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setMessage({
              type: "error",
              text: "Email or password is incorret",
            });
          } else {
            setMessage({
              type: "error",
              text: "An error occurred.Please try again.",
            });
          }
        });
    }
    setLoading(false);
  };

  return (
    <Container onSubmit={handleSubmit}>
      {type === "signup" ? (
        <Input
          placeholder="Name"
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
          placeholder="Telephone number no hyphen(optional)"
          type="number"
          onChange={handleChange("phone")}
        />
      ) : null}

      <Input
        placeholder="Password"
        required
        type="password"
        onChange={handleChange("password")}
        value={values.password}
      />
      {type === "signup" ? (
        <Input
          placeholder="Confirm password"
          required
          type="password"
          onChange={handleChange("confirmPassword")}
          value={values.confirmPassword}
        />
      ) : null}

      <Button type="submit" disabled={loading}>
        {loading ? "Loading" : type === "login" ? "LOGIN" : "SIGN UP"}
      </Button>
    </Container>
  );
}

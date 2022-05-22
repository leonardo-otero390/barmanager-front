import styled from "styled-components";

export const Input = styled.input`
  font-size: 16px;

  height: 72px;
  width: 100%;

  border-radius: 10px;
  border: none;
  padding: 0 16px;
  :focus {
    outline-color: #eba937;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  [type="number"] {
    -moz-appearance: textfield;
  }
`;

export const Button = styled.button`
  height: 72px;
  width: 100%;
  border-radius: 10px;
  background: #000;
  color: #eba937;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  font-size: 24px;
`;


export const FormContainer = styled.form`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

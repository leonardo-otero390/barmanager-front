import React from "react";
import Alert from "./components/Alert";
import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/Auth/Auth";
import Header from "./components/Header";
import BudgetRequest from "./pages/BudgetRequest/BudgetRequest";

function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/cadastro" element={<AuthPage type="signup" />} />
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/" element={<BudgetRequest />} />
        </Routes>
      </Router>
      <Alert />
    </>
  );
}

export default App;

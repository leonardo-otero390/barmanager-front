import React from "react";
import Alert from "./components/Alert";
import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/Auth/Auth";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/cadastro" element={<AuthPage type="signup" />} />
          <Route path="/" element={<AuthPage type="login" />} />
        </Routes>
      </Router>
      <Alert />
    </>
  );
}

export default App;

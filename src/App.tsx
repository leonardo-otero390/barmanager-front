import React from "react";
import Alert from "./components/Alert";
import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/Auth/Auth";

function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<AuthPage type="signup" />} />
        </Routes>
      </Router>
      <Alert />
    </>
  );
}

export default App;

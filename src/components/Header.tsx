import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { logOut, token } = useAuth();
  const navigate = useNavigate();
  function handlelogOut() {
    logOut();
    navigate("/");
  }
  return (
    <Container>
      <Link to="/">
        <h1>
          <strong>BARMANager</strong>
        </h1>
      </Link>
      {token ? (
        <button onClick={handlelogOut}>
          <LogoutIcon sx={{ fontSize: 32, color: "#fff" }} />
        </button>
      ) : (
        <button onClick={()=>navigate('/login')}>
          <AccountBoxIcon sx={{ fontSize: 32, color: "#eba937" }} />
        </button>
      )}
    </Container>
  );
}

const Container = styled.nav`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: #151515;
  box-shadow: 0px 4px 4px rgba(51, 21, 24, 0.25);
  align-items: center;
  justify-content: space-around;
  margin-bottom: 8px;
  h1 {
    font-family: "Roboto", sans-serif;
    color: #eba937;
    font-size: 32px;
  }
  button {
    border: none;
    background: none;
    cursor: pointer;
  }
`;

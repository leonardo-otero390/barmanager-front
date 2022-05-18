import LogoutIcon from "@mui/icons-material/Logout";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  function handlelogOut() {
    logOut();
    navigate("/");
  }
  return (
    <Container>
      <button onClick={() => navigate("/search/terms")}>
      </button>
      <button onClick={handlelogOut}>
        <LogoutIcon sx={{ fontSize: 48 }} />
      </button>
    </Container>
  );
}

const Container = styled.nav`
  display: flex;
  width: 100%;
  height: 100px;
  padding: 36px;
  align-items: center;
  justify-content: space-between;
  button {
    border: none;
    background: none;
  }
`;

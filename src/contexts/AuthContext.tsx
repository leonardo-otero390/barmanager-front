import { createContext, useState } from "react";

interface IAuthContext {
  token: string | null;
  logIn: (token: string) => void;
  logOut: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface Props {
  children: React.ReactNode;
}

const LOCAL_STORAGE_KEY = "token";
const persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(persistedToken);

  function logIn(token: string) {
    setToken(token);
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
  }

  function logOut() {
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ token, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

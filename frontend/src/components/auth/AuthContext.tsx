import { useState, type ReactNode, createContext } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null);

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

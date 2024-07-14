import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IauthContextValues {
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IauthContextValues>({
  token: null,
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

interface IauthContextProviderProps {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: IauthContextProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(null);

  function authenticate(token: string) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

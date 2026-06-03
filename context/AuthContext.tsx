"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { users } from "@/lib/dummyuser";

type User = {
  id: number;
  email: string;
  password: string;
  role: "user" | "host";
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(
  null
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  // Restore login from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("ev-user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // LOGIN FUNCTION
  const login = (
    email: string,
    password: string
  ) => {
    const foundUser = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (foundUser) {
      setUser(foundUser);

      localStorage.setItem(
        "ev-user",
        JSON.stringify(foundUser)
      );

      return true;
    }

    return false;
  };

  // LOGOUT FUNCTION
  const logout = () => {
    setUser(null);

    localStorage.removeItem("ev-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
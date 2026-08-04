import { AuthContext } from "@/components/auth/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

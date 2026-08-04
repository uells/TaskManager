import { type ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;

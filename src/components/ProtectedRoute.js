import { Navigate } from "react-router-dom";
import { TokenContext } from "../context/TokenProvider";
import { useContext } from "react";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(TokenContext);

  return token && token.role === "instructor" ? children : <Navigate to="/" />;
}

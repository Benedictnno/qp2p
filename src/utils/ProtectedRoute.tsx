import { RootState } from "@/States/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.login);
   

  if (!user) {
    return <Navigate to="/login" replace />;
  } else if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }  
  
  return <>{children}</>;
  

};

export default ProtectedRoute;

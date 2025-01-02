import axios from "axios";
import Modal from "./Model";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { log } from "console";
import { Navigate } from "react-router-dom";
function LogOut() {
  console.log('logout');
  const verify = async () => {
    try {
      await axios.post('http://localhost:5000/api/v1/auth/logout', {}, { withCredentials: true });
      sessionStorage.removeItem("user");
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  verify();
   return <Navigate to="/login" replace />;
}

export default LogOut;

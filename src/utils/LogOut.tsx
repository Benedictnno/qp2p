import axios from "axios";
import Modal from "./Model";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { log } from "console";
import { Navigate } from "react-router-dom";


import { useEffect } from "react";


const LogOut = () => {
  const logOutUser = async () => {
    try {
      await axios.post("http://localhost:5000/api/v1/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("user"); // Clear user data
      localStorage.removeItem("loginTime"); // Clear login time
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const checkLogout = async () => {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - parseInt(loginTime, 10); // Time in milliseconds
        const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (elapsedTime >= oneDay) {
          await logOutUser();
          window.location.reload(); // Refresh to enforce logout
        }
      } else {
        // If no login time is found, log out the user
        await logOutUser();
        window.location.reload();
      }
    };

    checkLogout();

    // Set up an interval to check periodically if the user should be logged out
    const interval = setInterval(checkLogout, 60 * 1000); // Check every minute

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return <Navigate to="/login" replace />;
};

export default LogOut;

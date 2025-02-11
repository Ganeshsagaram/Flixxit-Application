import React, { useState,useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getToken, clearTokens } from '../Utlis/Utlis'; // Make sure clearToken is implemented

export default function LogOut() {
  const [loggedOut, setLoggedOut] = useState(false);
const navigate=useNavigate()
  useEffect(() => {
    if (getToken()) {
      clearTokens(); 
      setLoggedOut(true); // Force re-render after clearing token
    }
  }, []);

  if (loggedOut) {
      navigate("/before-login")
    window.location.href = "/before-login"; // Hard reload the page to reset UI
    return null;
  }

  return null;

}
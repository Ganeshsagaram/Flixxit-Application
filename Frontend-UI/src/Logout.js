import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';

export default function Logout() {
    const navigate=useNavigate();
    function handleLogOut(event){
        event.preventDefault();
        navigate("/header")
    }
  return (
    <div>
        <Button onClick={handleLogOut}>Logout</Button>
    </div>
  )
}

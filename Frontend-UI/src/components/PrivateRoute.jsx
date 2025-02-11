import React from 'react'
import { useNavigate } from 'react-router-dom';

import { useState,useEffect } from 'react';
import { getToken } from '../Utlis/Utlis';

export default function PrivateRoute({component}) {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = getToken();
        if (token) {
          setIsVisible(true);
        } else {
            navigate('/login')
        }
    }, [])
  return (
   isVisible?component:<></>
  )
}

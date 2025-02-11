import React,{useContext} from 'react'
import Logout from './Logout'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import { UserContext } from './UserContext'
export default function Common() {
  // const navigate=useNavigate()
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Common Page</h1>
      <p>Your Name {user.userName}</p>

      <p>Your password is {user.password}</p>
    </div>
  )
}

import React, { useState,useEffect } from "react";
import "./Profile.css"; // Importing CSS file
import axios from "axios";
import { getToken } from "../Utlis/Utlis";

const UserProfileUpdate = () => {
    const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword]=useState("")
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [email,setEmail]=useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")||sessionStorage.getItem("token"); // Assuming token is stored in localStorage
    axios
      .get("http://localhost:5000/get-user", {
        headers: { token },
      })
      .then((res) => {setUserName(res.data.userName)
        setEmail(res.data.email);
        setLoading(false)
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const trimmedUserName = userName.trim();
  const trimmedPassword = password.trim();
  const trimmedConfirmPassword = confirmPassword.trim();
  if (trimmedUserName === "" && trimmedPassword === "") {
    setMessage("Please update at least one field!");
    return;
  }
  if (trimmedPassword !== "" || trimmedConfirmPassword !== "") {
    if (trimmedPassword === "" || trimmedConfirmPassword === "") {
      setMessage("Both password fields are required!");
      return;
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
  }
  if(password===confirmPassword){
        setMessage("Profile updated successfully!");
        const token = localStorage.getItem("token"); // Get stored token

    axios
      .patch(
        "http://localhost:5000/update-user",
        { userName, password },
        {
          headers: { token },
        }
      )
      .then((res) => {
        setMessage("Profile updated successfully! ✅");
      })
      .catch((err) => {
        setMessage(
          err.response?.data?.message || "Error updating profile. ❌"
        );
      })
      .finally(() => setLoading(false));

        // alert(message+" "+"Changes will be reflected");
        setPassword("");
        setConfirmPassword("");
        // setMessage("");
    }
    
  };

  return (
    <div className="profile-container">
      <h2>Update Profile</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleUpdate} className="profile-form">
        <label>Email:</label>
        <input
          type="email"
          value={loading ? "Fetching..." : email}
          readOnly style={{background:"#454545"}}/>
        <label>Name:</label>
        <input
          type="text"
          value={loading ? "Fetching..." : userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />

<button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UserProfileUpdate

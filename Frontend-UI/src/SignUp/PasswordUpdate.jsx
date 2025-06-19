
import "./signup.css";

import { useState, useContext } from "react";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
// export default function PasswordUpdate(){
//     return(
//         <div>Password Update page</div>
//     )
// }
export default function PasswordUpdate() {

    const navigate = useNavigate();
    const [apiLoading, setApiLoading] = useState(false);
  
    // React Hook Form setup
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm();
  
    const password = watch("password");
    
    // Form submit handler
    const onSubmit = async (data) => {
      setApiLoading(true);
      console.log(data)
      try {
        const response = await axios.patch("https://backend-service-5ktn.onrender.com/update-password", {
          
          email: data.email,
          password: data.password,
        });
  
        console.log("Password Updated successfully:", response.data);
      //   setUser({ userName: data.username, email: data.email, password: data.password });
        alert("You are navigating to the Login Page");
        navigate("/login");
      } catch (err) {
        alert(err.response.data.message);
        console.error(err.response.data.message);
      }
      setApiLoading(false);
    };
return(
    <div className="signup">
    <div className="signup-page">
      <Box padding={2} className="signup-form">
        <Typography variant="h4">Password Update</Typography>



        {/* Email Field */}
        <Box padding={2}>
          <TextField
            label="Email"
            type="email"
            size="small"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email", {
              required: { value: true, message: "Email is Required" },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Email should be in a valid format",
              },
            })}
            sx={{
              "& label": { color: "white" },
              "& label.Mui-focused": { color: "red" },
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "red" },
                "&.Mui-focused fieldset": { borderColor: "red" },
              },
            }}
          />
        </Box>

        {/* Password Field */}
        <Box padding={2}>
          <TextField
            label="Password"
            type="password"
            size="small"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: { value: true, message: "Password is Required" },
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              maxLength: { value: 100, message: "Password can be max 100 characters" },
            })}
            sx={{
              "& label": { color: "white" },
              "& label.Mui-focused": { color: "red" },
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "red" },
                "&.Mui-focused fieldset": { borderColor: "red" },
              },
            }}
          />
        </Box>

        {/* Confirm Password Field */}
        <Box padding={2}>
          <TextField
            label="Confirm Password"
            type="password"
            size="small"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: { value: true, message: "Confirm Password is Required" },
              validate: (value) => value === password || "Passwords do not match",
            })}
            sx={{
              "& label": { color: "white" },
              "& label.Mui-focused": { color: "red" },
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "red" },
                "&.Mui-focused fieldset": { borderColor: "red" },
              },
            }}
          />
        </Box>

        {/* Submit Button */}
        <Box padding={2}>
          {apiLoading ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>Update Password</Button>
          )}
        </Box>

        {/* Login Redirect */}
        <Box padding={2}>
          <Typography variant="caption">Else Signup?</Typography>
          <Link to="/signup">
            <Button variant="text" disabled={apiLoading}>signup</Button>
          </Link>
        </Box>
      </Box>
    </div>
  </div>
)
   
}

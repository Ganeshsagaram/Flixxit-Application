// import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
// import axios from 'axios'
// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { Link, useNavigate } from 'react-router-dom'
// import './Login.css'

// export default function LoginAlternate({onLogin}) {

//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const navigate = useNavigate();
//     const [apiLoading, setApiLoading] = useState(false);
    

//     function mySubmit(formData) {
//         //to call generate-token api
//         setApiLoading(true)
//         axios.get("http://localhost:9000/generate-token", {
//             headers: {
//                 myusername: formData.username,
//                 mypassword: formData.password
//             }
//         }).then(response => {
//             // when we receive response
//             onLogin();
//             console.log(formData.username,"password",formData.password)
//             if (response.data && response.data.token) {
//                 if (formData.rememberMe) {
//                     localStorage.setItem("token", response.data.token) // persisted even after we close browser
//                 } else {
//                     sessionStorage.setItem("token", response.data.token) // will be deleted automatically from broswer after you close the tab
//                 }
//                 // createAxiosInstance();
//                 // navigate("/headerpage")
//             } else {
//                 alert("Not a valid User")
//             }
//         }).catch(error => {
//             alert("Not a valid User")
//         }).finally(() => {
//             setApiLoading(false)
//         })
//     }

//     return (
//         <div className='login-page'>
//             <Box padding={2} className='login-form'>
//                 <Typography variant='h4'>Welcome</Typography>
//                 <Box padding={2}>
//                     <TextField disabled={apiLoading} label={"Username"} type='text'
//                         error={errors?.username}
//                         helperText={errors?.username?.message}
//                         {...register("username", { required: { value: true, message: "Username is Required" } })} />
//                 </Box>
//                 <Box padding={2}>
//                     <TextField disabled={apiLoading} label={"Password"} type='password'
//                         error={errors?.password}
//                         helperText={errors?.password?.message}
//                         {...register("password", { required: { value: true, message: "Password is Required" } })} />
//                 </Box>
//                 <Box padding={2}>
//                     <FormGroup >
//                         <FormControlLabel {...register("rememberMe")} disabled={apiLoading} control={<Checkbox />} label="Remember Me" />
//                     </FormGroup>
//                 </Box>
//                 <Box padding={2}>
//                     {
//                         apiLoading ? <CircularProgress /> : <Button disabled={apiLoading} variant='contained' onClick={handleSubmit(mySubmit)} >LOGIN</Button>
//                     }
//                 </Box>
//                 <Box padding={2}>
//                     <Typography variant='caption'>Dont have an accout?</Typography>
//                     <Link to={'/signup'}>
//                         <Button variant='text' disabled={apiLoading}>SIGN UP</Button>
//                     </Link>
//                 </Box>
//             </Box>
//         </div>
//     )
// }


import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import HeaderPage from '../components/HeaderPage';

export default function LoginAlternate({ onLogin }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [apiLoading, setApiLoading] = useState(false);

    function mySubmit(formData) {
        setApiLoading(true);
        axios.get("https://ganesh-backend-do4x.onrender.com/generate-token", {
            headers: {
                myemail: formData.email,
                mypassword: formData.password
            }
        }).then(response => {
            if (response.data && response.data.token) {
                if (formData.rememberMe) {
                    localStorage.setItem("token", response.data.token);
                } else {
                    sessionStorage.setItem("token", response.data.token);
                }
                

                navigate("/headerpage");
                window.location.reload(); // Redirect after login
            } else {
                alert("Not a valid User");
            }
        }).catch(error => {
            alert("Not a valid User");
        }).finally(() => {
            setApiLoading(false);
        });
    }

    return (
        <div>
            <div className="login">
            <div className='login-page'>
            <Box padding={2} className='login-form'>
                <Typography variant='h4'>Welcome</Typography>
                <Box padding={2}>
                    <TextField disabled={apiLoading} label={"Email"} type='email'
                        error={errors?.email}
                        helperText={errors?.email?.message}
                        {...register("email", { required: { value: true, message: "Email is Required" } })}
                        sx={{
                            '& label': { color: 'white' },  /* Default label color */
                            '& label.Mui-focused': { color: 'red' }, /* Color when focused */
                            '& .MuiInputBase-input': { color: 'white' }, /* Input text color */
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' }, /* Default border color */
                                '&:hover fieldset': { borderColor: 'red' }, /* Border color on hover */
                                '&.Mui-focused fieldset': { borderColor: 'red' } /* Border color on focus */
                            }}}/>
                </Box>
                <Box padding={2}>
                    <TextField disabled={apiLoading} label={"Password"} type='password'
                        error={errors?.password}
                        helperText={errors?.password?.message}
                        {...register("password", { required: { value: true, message: "Password is Required" } })}
                        sx={{
                            '& label': { color: 'white' },  /* Default label color */
                            '& label.Mui-focused': { color: 'red' }, /* Color when focused */
                            '& .MuiInputBase-input': { color: 'white' }, /* Input text color */
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' }, /* Default border color */
                                '&:hover fieldset': { borderColor: 'red' }, /* Border color on hover */
                                '&.Mui-focused fieldset': { borderColor: 'red' } /* Border color on focus */
                            }}}
                        />
                </Box>
                <Box padding={2} sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "6px" }}>
    <FormGroup>
        <FormControlLabel 
            {...register("rememberMe")} 
            disabled={apiLoading} 
            control={<Checkbox sx={{
                color: "red", // unchecked color
                '&.Mui-checked': {
                  color: "red", // checked color
                },
              }} />} 
            label={<span style={{ color: "white" }}>Remember Me</span>} 

        />
    </FormGroup>
</Box>

                <Box padding={2}>
                    {apiLoading ? <CircularProgress /> :
                        <Button disabled={apiLoading} variant='contained' onClick={handleSubmit(mySubmit)}>LOGIN</Button>
                    }
                </Box>
                <Box padding={2}>
                    <Typography variant='caption'>Don't have an account?</Typography>
                    <Link to={'/alternate-signup'}>
                        <Button variant='text' disabled={apiLoading}>SIGN UP</Button>
                    </Link>
                </Box>
            </Box>
        </div>
            </div>
        
        </div>
    );
}


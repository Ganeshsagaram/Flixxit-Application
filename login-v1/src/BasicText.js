import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
export default function BasicTextFields() {
const [name,setName]=React.useState(null)
const [password,setPassword]=React.useState(null)
function handleEvent(e){
    console.log(typeof(e.target.value));
    if(e.target.value.length===0){
        setName(null);
    }
    else{
        setName(e.target.value)
    }
}
function handlePassword(e){
    console.log(typeof(e.target.value));
    if(e.target.value.length===0){
        setPassword(null)
    }
    else{
        setPassword(e.target.value);
    }
}
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="userName" variant="outlined" value={name} onChange={handleEvent}/>
        <Paper elevation={2} style={{color:"red",background:"black",margin:"10px"}}>{name===null?"Enter your name":name}</Paper>
      <br/>
      <TextField id="outlined-basic" label="password" variant="outlined"  value={password} onChange={handlePassword}/>
      <Paper elevation={2} style={{color:"red",background:"black",margin:"10px"}} >{password===null?"Enter password":password}</Paper>
      <br/>
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </Box>
  );
}

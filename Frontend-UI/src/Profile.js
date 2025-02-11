import React from 'react'
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import { UserContext } from './UserContext';
import { useContext } from 'react';
const CustomAvatar=({userName})=>{
    return <Avatar>{userName.toUpperCase()}</Avatar>
}
export default function Profile() {
    const { user } = useContext(UserContext);
  return (
    <div>
        <Stack direction={"row"} spacing={2}>
            <CustomAvatar userName={user.userName[0]}/>
        <Avatar src='/broken-image.jpg'/>
        </Stack>
        
    </div>
  )
}

import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import ToggleButton from '@mui/material/ToggleButton';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Checkboxes() {
  const [toggleButton,setToggleButton]=React.useState(false);
  function handleEvent(){
    console.log(`Button toggle ${toggleButton}`)
    setToggleButton(!toggleButton)
    console.log(`Button toggled ${toggleButton}` )
  }
  return (
    <div>
      <ToggleButton value="web" style={{
        padding:"20px",
        width:"70px",
        height:"50px"
      }} onClick={handleEvent}>Web</ToggleButton>
    </div>
  );
}
import { Typography } from '@mui/material'
import React from 'react'
import SlideShow from './SlideShow'
// import GenreDropDown from '../Movie_Components/GenredDropDown'
// import GenreSelect from '../Movie_Components/GenredDropDown'
import TitleCards from './TitleCards'
import './TitleCard.css';
import HeaderPage from './HeaderPage';
export default function HomePage() {
  return (
    <div>
      {/* <HeaderPage/> */}
        <Typography variant='h2'>
        HomePage
        <br/>
        <br/>
        </Typography>
       <SlideShow/>
       <div className="more-cards">
      <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
      <TitleCards title={"Only on Flixxit"} category={"popular"}/>
      <TitleCards title={"Upcoming"} category={"upcoming"}/>
      <TitleCards title={"Top Pics for You"} category={"now_playing"}/>
      </div>
      
    </div>
  )
}

import React, { useState } from 'react';
import { TextField } from '@mui/material';
import List from './List';
import './SearchMovie.css'; // Import the CSS

export default function SearchMovie() {
    const [inputText, setInputText] = useState("");

    const inputHandler = (e) => {
        e.preventDefault();
        var lowerCase = e.target.value.toLowerCase();
        console.log(lowerCase);
        setInputText(lowerCase);
    };

    return (
        <div className="main">
            <h1>Movie Search</h1>
            <div className="search">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Search"
                    onChange={inputHandler}
                    fullWidth
                />
            </div>
            {/* <List input={inputText} /> */}
        </div>
    );
}


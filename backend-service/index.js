
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
dotenv.config();

import { Usersapi } from '../backend-service/Users/users.js';
import { Moviesapi } from '../backend-service/Movies/movies.js';
import cors from "cors"
import { AutherizeMiddleware } from '../backend-service/middleware/auth.js';
const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.redirect("/home");
});
const PORT=process.env.PORT_NUMBER||5000;

app.use("/", Usersapi);
app.use("/",AutherizeMiddleware,Moviesapi);




app.listen(PORT, () => {
    console.log(`app started at ${PORT}`)
})
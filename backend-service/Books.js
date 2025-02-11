
// const express=require('express');
import express from 'express'
// const bodyParer=require('body-parser')
import bodyParser from 'body-parser';
// const {v4:uuidv4}=require("uuid");

// import {v4 as uuidv4} from 'uuid';
// const validator=require("express-validator");
import validator from 'express-validator'
const bodyValidator=validator.body;
// require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config();


import { dbConnection } from './DB-Connections/mongoConnect.js'
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { Router } from 'express';

const saltRounds = 5;
export const booksApi=Router();
//post request Validation
const postBookValidation=[
    bodyValidator('bookName').isString().isLength({min:4}),
    bodyValidator('Author').isString().isLength({min:2,max:20}),
    bodyValidator('publicationDate').customSanitizer(val=>val.split('-')).customSanitizer((data)=>
        {
            let day=data[0];
            let month=data[1];
            let year=data[2];
            if((Number(day)>=1&&Number(day)<=31)&&(Number(month)>=1&&Number(month)<=12)&&(year.length==4)==false){
                throw new Error("Not a valid date format")
            }
            return data.join().replace(/,/g,"-");
                
        })
]


// const booksApi=express();
// booksApi.use(cors())

// booksApi.use(bodyParser.json());

// const PORT=8080;


const tempHoldOfData=[];


//testing home route

booksApi.get("/",(req,res)=>{
    // res.send("hi in get home route");
    res.json({"msg":"hi"})
});

//get all books

booksApi.get("/get-all-books",async (req,res)=>{
    const connection=await dbConnection()
   
    const hasData=await connection.db("Books_CRUD_API").collection("books").countDocuments()
    if(hasData>0){
        const theData=await connection.db("Books_CRUD_API").collection("books").find({}).toArray();
        res.send(theData);
        return;
    }
    res.status(400).send("No data available");
    
    
})

//get a book by id 

booksApi.get("/find-book-by-id/:id",async (req,res)=>{
    const connection=await dbConnection();
    const id=req.params.id;
    const bookFound=await connection.db("Books_CRUD_API").collection("books").findOne({_id:new ObjectId(id)},{
        projection:{
            _id:0
        }
    });
    if(bookFound!=null){
        res.send(bookFound);
        return;
    }
    res.send("No book found with the ID");

})

//get books by the author name
booksApi.get("/find-book-by-author/:name",async (req,res)=>{
    const connection=await dbConnection();
    const authorName=req.params.name;
    const requiredResult=await connection.db("Books_CRUD_API").collection("books").find({Author:authorName}).toArray();
    if(requiredResult.length!==0){
        res.send(requiredResult);
        console.log(requiredResult)
        return;
    }
    
    res.status(400).send("No book available with the Author Name");

});

//patching with the id which is unique

booksApi.patch("/update-book-by-id/:id",postBookValidation,async (req,res)=>{

    const connection=await dbConnection();
    // const theIDToBeUpdated=req.params.id;
    const books=await connection.db("Books_CRUD_API").collection("books");
    const bookId=await books.findOne({_id:new ObjectId(req.params.id)});
    if(bookId)
    {
        const filter={
        _id:bookId._id
    }
    const options={
        upsert:true
    }
   
    if(req.body.bookName!=null&&req.body.Author!=null&&req.body.publicationDate!=null){
        const update={
            $set:{
                bookName:req.body.bookName,
                Author:req.body.Author,
                publicationDate:req.body.publicationDate
            }
        }
        const result=await books.updateOne(filter,update,options);
        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
          );
          res.send(`the book with id ${bookId._id} updated`);
    }
    
    else{
        res.send("Provide every details for the Book to be Updated, else it is unable to update the one field of BSON document")
    }
     
      
    
    }
    else{
        res.status(400).send("No book available with the given id")

    }

    


});

// delete the book by storing it in new array
booksApi.delete("/delete-book-by-id/:id",async (req,res)=>{
    const connection=await dbConnection();

    const theIDToBeDeleted=req.params.id;
    const findTheBookToDelete=await connection.db("Books_CRUD_API").collection("books").findOne({_id:new ObjectId(theIDToBeDeleted)})
    if(findTheBookToDelete!=null){
       const isDeleted=await connection.db("Books_CRUD_API").collection("books").deleteOne({_id:new ObjectId(theIDToBeDeleted)});
       console.log(isDeleted);
       res.send(theIDToBeDeleted);
       return;
    }
    // console.log(isDeleted);
    res.status(400).send("No id found to delete");
    
   
    

})

//storing new book with express validation and santization. Added a seperate array validation insteading of adding the validation here

booksApi.post("/book",postBookValidation
,async (req,res)=>{
    const connection=await dbConnection();
    const obj={
        
        bookName:"",
        Author:"",
        publicationDate:"",
    }
    const {bookName,Author,publicationDate}=req.body;
    let errors=validator.validationResult(req);
    if(errors.isEmpty()){
    
    obj.bookName=bookName;
    obj.Author=Author;
    
    obj.publicationDate=publicationDate;
    
    // Object.defineProperty(obj,"id",{value:id})
   
    // console.log(`New id is created ${id}`)
    // console.log(obj);
    // res.json(obj);
    tempHoldOfData.push(obj);
    const insertTheDoc=await connection.db("Books_CRUD_API").collection("books").insertOne(obj);
    console.log(insertTheDoc)
    res.send(`data has been received successfully`)
   }
   else{
    console.log(errors.array())
    res.status(422).json({errors:errors.array()})
   }
   
});

booksApi.post("/hash-password-route",async (req,res)=>{
const newHashedObj={
    myPassword:"",
    secretKey:""
}
const connection=await dbConnection();
const {password}=req.body;
newHashedObj.myPassword=password;
let user=req.headers['name'];
console.log(user);
try{
    const hash=await bcrypt.hash(password,saltRounds);
newHashedObj.secretKey=hash
await connection.db("Books_CRUD_API").collection("hashedPasswords").insertOne((newHashedObj));
console.log(newHashedObj);
res.send(`password has been hashed with mentioned salt rounds ${JSON.stringify(newHashedObj)}`);

}
catch(err){
    console.log(err);
    res.status(500).send(`${err}`)
}


})


booksApi.post("/signed-token",async (req,res)=>{
    const connection=await dbConnection();
    const {password}=req.body;
    console.log("password is",password)
    const newPasswordObj={
        password:password,
        token:''
    }
  
    
    try{
        const tokenGeneration=jwt.sign(newPasswordObj,process.env.ACCESS_TOKEN);
        newPasswordObj.token=tokenGeneration;
        await connection.db("Books_CRUD_API").collection("jwt").insertOne((newPasswordObj));

        res.send("Password has been authenicated successfully with JWT");
    console.log(`Your Token is ${tokenGeneration} and it has been stored in the collections the obj contains ${(newPasswordObj.password)} ${newPasswordObj.token}`)
    }
    catch(err){
        console.log(err)
        res.status(500).send("DB error");
    
    }
   
    
});


// booksApi.post("/jwt-decode",async (req,res)=>{
//     const token=req.headers['authorization'];
//     console.log(token)
//     if(token){
//         jwt.verify(token,process.env.ACCESS_TOKEN,(err,decode)=>{
//             if(err){
//                 return res.status(401).send('Unauthorised')
//             }
//             else{
//                 req.user=decode;
//             }
//         })
//     }else{
//         return res.status(401).send("Provide the token")
//     }

// })
// server started running on this port
// booksApi.listen(PORT,()=>{
//     console.log(`server started at ${PORT}`)
     
// })
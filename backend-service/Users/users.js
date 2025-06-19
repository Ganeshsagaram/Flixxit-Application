import validator from 'express-validator'
const bodyValidator=validator.body;

import dotenv from 'dotenv'

import { Router } from "express"

import { dbConnection } from '../../backend-service/DB-Connections/mongoConnect.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();
export const Usersapi = Router();



const postUserValidation = [
    bodyValidator("userName")
        .isString()
        .withMessage("Should be a string")
        .notEmpty()
        .withMessage("Required")
        .isLength({ min: 5, max: 50 })
        .withMessage("Username should be 5-50 letters long"),

    bodyValidator("email")
        .isString()
        .withMessage("Should be a string")
        .notEmpty()
        .withMessage("Required")
        .isEmail()
        .withMessage("Invalid email format"),

    bodyValidator("password")
        .isString()
        .withMessage("Should be a string")
        .notEmpty()
        .withMessage("Required")
        .isLength({ min: 8, max: 100 })
        .withMessage("Password should be 8-100 letters long"),
];

const passwordUpdate=[
    bodyValidator("email")
        .isString()
        .withMessage("Should be a string")
        .notEmpty()
        .withMessage("Required")
        .isEmail()
        .withMessage("Invalid email format"),

    bodyValidator("password")
        .isString()
        .withMessage("Should be a string")
        .notEmpty()
        .withMessage("Required")
        .isLength({ min: 8, max: 100 })
        .withMessage("Password should be 8-100 letters long")
]



Usersapi.get("/get-users",async(req,res)=>{
    const connection=await dbConnection();
    const users=await connection.db("userDB").collection("users").find().toArray();
    if(users.length>0){
        res.send(users);
    } 
    else{
        res.status(500).send("No users are found");
    }
});
Usersapi.get("/get-user", async (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRETE_KEY);
        const userId = decoded.userID; // Extract userId from token

        const connection = await dbConnection();
        const user = await connection
            .db("userDB")
            .collection("users")
            .findOne({ _id: new ObjectId(userId) }, { projection: { passwordHashed: 0 } }); // Exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json(user);
    } catch (error) {
        // console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

});



Usersapi.delete("/delete-user/:id", async (req, res) => {
    try {
        const connection = await dbConnection();
        const userId = req.params.id;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const result = await connection
            .db("userDB")
            .collection("users")
            .deleteOne({ _id: new ObjectId(userId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully", result });
    } catch (error) {
        // console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

Usersapi.post("/signup-user",postUserValidation,async (req,res)=>{
        const connection=await dbConnection();
    
        let errors=validator.validationResult(req);
        if(errors.isEmpty()){
            
                
               const userCheck=await connection.db("userDB").collection("users").find({
                userName:{
                    $regex:req.body.userName,
                    $options:'i'
                }
               }).toArray();
               if(userCheck.length>0){
                res.status(400).json({message:"user exists with the Name"});
                return;
               }
               else{
                const encryptedPassword = await bcrypt.hashSync(req.body.password,10);
                const obj={
                    ...req.body,
                    passwordHashed:encryptedPassword
                }
                
                const insertTheDoc=await connection.db("userDB").collection("users").insertOne(obj);
                // console.log(insertTheDoc)
                
                res.send("user created successfully");
                return;
               }
            
               
               
                
        }else{
            // console.log(errors.array())
    res.status(422).send("error in signing up")
        }
       
});

Usersapi.get("/generate-token",async (req,res)=>{
   const connection= await dbConnection();
   const userMail = req.headers.myemail;
//    console.log(userMail)
    const user=await connection.db("userDB").collection("users").findOne({ email: userMail });
    if (user && bcrypt.compareSync(req.headers.mypassword, user.passwordHashed)) {
        const token = jwt.sign({
            userName: user.userName,
            userID:user._id,
            email: user.email
        },
           SECRETE_KEY,
            {
                expiresIn: "1hr"
            }
        )
        //generate the token and send it to client
        res.json({ token })
    } else {
        res.status(401).json({ message: "Un authorized." })
        return;
    }


});

Usersapi.get("/verify-token",async (req,res)=>{

    const token=req.headers['token'];
        if(token){
            jwt.verify(token,SECRETE_KEY,(err,decode)=>{
                if(err){
                    return res.status(401).send(err)
                }
                else{
                    res.send("Verified user")
                }
            })
        }else{
            return res.status(401).send("Provide the token")
        }

});

Usersapi.patch("/update-user", async (req, res) => {
    
    const connection = await dbConnection();

    
    const token = req.headers['token'];
    if (!token) {
        return res.status(401).json({ message: "Token required." });
    }

   
    jwt.verify(token, SECRETE_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token." });
        }

        const userID = decoded.userID;
        const { userName, password } = req.body;

        
        let updateFields = {};
        if (userName) updateFields.userName = userName;
        if (password){ 
            
            updateFields.passwordHashed = bcrypt.hashSync(password, 10);
            updateFields.password=password;
        } 

        const dbResponse = await connection
            .db("userDB")
            .collection("users")
            .updateOne({ _id: new ObjectId(userID) }, { $set: updateFields });

        if (dbResponse.modifiedCount > 0) {
            res.json({ message: "Profile updated successfully." });
        } else {
            res.status(400).json({ message: "No changes detected or user not found." });
        }
    });
});


Usersapi.patch("/update-password",passwordUpdate,async(req,res)=>{
    const connection=await dbConnection();
    
    let errors=validator.validationResult(req);

    if(errors.isEmpty()){
            
                
        const userCheck=await connection.db("userDB").collection("users").find({
         email:{
             $regex:req.body.email,
             $options:'i'
         }
        }).toArray();
        if(!userCheck){
         res.status(400).json({message:"user doesn't exists with the email"});
         return;
        }
        else{
         const encryptedPassword = bcrypt.hashSync(req.body.password,10);
         const obj={
             ...req.body,
             passwordHashed:encryptedPassword
         }
         
         const updateResult=await connection.db("userDB").collection("users").updateOne({
            email:req.body.email
         },{
            $set:{
                password:req.body.password,
                passwordHashed:encryptedPassword
            }
           
         });
         if (updateResult.modifiedCount === 0) {
            return res.status(500).json({ message: "Password update failed" });
        }
         
         res.send("Password updated successfully");
         return;
        }
     }
 else{
    // console.log(errors.array())
res.status(422).send("error in updating password")
}
})





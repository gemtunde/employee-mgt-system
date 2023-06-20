import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mysql from "mysql";
import bcrypt from "bcrypt";
import  JsonWebToken from "jsonwebtoken";


const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());


const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    passowrd : "",
    database : "ems",
});

con.connect(function(err){
    if(err){
        console.log("Error in connection");
    }else{
        console.log("Connected");
    }
});

//login
app.post("/login", (req, res) => {
    const sql = ("SELECT * FROM users Where email= ? AND password = ?");
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({status : "Error", message:"Error in executing query" });
        if(result.length > 0) {
            return res.json({status : "success"})
        }else{
            return res.json({status : "Error", message:"Wrong Email or Password"})
        }
    })
})

app.listen(8081, ()=> {
  console.log("Server Running")
})





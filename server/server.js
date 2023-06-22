import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mysql from "mysql";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";


const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));


const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    passowrd : "",
    database : "ems",
});

//storage for file
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "public/images")
    } ,
    filename : (req, file, cb)=> {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage : storage
})

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
});

//create - signup
app.post("/create", upload.single("image"), (req, res) => {
   const sql = "INSERT INTO employee (`name`, `email`,`password`,`salary`,`address`,`image`) VALUES (?)";
   bcrypt.hash(req.body.password.toString(), 10, (err, hash)=> {
        if(err) return res.json({message : "Error in hashing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.salary,
            req.body.address,
            req.file.filename,
        ];
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({message : "Error in signup"});
            return res.json({message : "success", user : result});
        })
   })
});

// All getemployees
app.get("/getEmployee", (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({message : "Get an Employee Error "});
        if(result.length === 0) return res.json({message : "No employee records found"});
        return res.json({Status :"Success", Result:result})
    })
})
// get single employee
app.get(`/get/:id`, (req, res) => {
    const id = req.params.id ;
    const sql = "SELECT * FROM employee Where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({message : "Get an Employee Error "});
        if(result.length === 0) return res.json({message : "No employee records found"});
        return res.json({Status :"Success", Result:result})
    })
});


//update employee
app.put("/update/:id", (req, res) => {
    const id = req.params.id ;
    const sql = "UPDATE employee set salary=? WHERE id = ?";
    con.query(sql, [req.body.salary, id], (err, result) => {
         if(err) return res.json({message : "Update Employee Error "});
        return res.json({Status :"Success"})
    })
});
//delete employee
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id ;
    const sql = "DELETE FROM employee WHERE id = ?";
    con.query(sql, [id], (err, result) => {
         if(err) return res.json({message : "DELETE Employee Error "});
        return res.json({Status :"Success"})
    })
});



app.listen(8081, ()=> {
  console.log("Server Running")
})





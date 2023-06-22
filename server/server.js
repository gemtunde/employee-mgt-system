import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mysql from "mysql";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";


const app = express();
app.use(cors({
    origin :[ "http://localhost:5173"],
    methods : ["POST", "GET", "PUT"],
    credentials : true
}));
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

//verify token 
const verifyUser = (req, res, next) => {
        token = req.coookie.token ;
        if(!token){
            return res.json({Error : "You are not Autnthenticated"});
        }else{
            jwt.verify(token, "jwt-secret-token", (err, decoded) => {
                if(err) return res.json({Error : "Wrong token"});
                req.role = decoded.role
                req.id = decoded.id
                next();
            })
        }
}

//dashboard 
app.get("/dashboard", verifyUser, (req, res) => {
return res.json({Status : "Success", role: req.role, id:req.id});
})
//login as admin
app.post("/login", (req, res) => {
    const sql = ("SELECT * FROM users Where email= ? AND password = ?");
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({status : "Error", message:"Error in executing query" });
        if(result.length > 0) {
            //const id = result[0].id ;
            const token = jwt.sign({role : "admin"}, "jwt-secret-token", {expiresIn : "2d"});
            res.cookie("token", token);
            return res.json({Status : "Success"})
        }else{
            return res.json({Status : "Error", message:"Wrong Email or Password"})
        }
    })
});

//create - signup as admin
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

// All getemployees as admin
app.get("/getEmployee", (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({message : "Get an Employee Error "});
        if(result.length === 0) return res.json({message : "No employee records found"});
        return res.json({Status :"Success", Result:result})
    })
})
// get single employee as admin
app.get(`/get/:id`, (req, res) => {
    const id = req.params.id ;
    const sql = "SELECT * FROM employee Where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({message : "Get an Employee Error "});
        if(result.length === 0) return res.json({message : "No employee records found"});
        return res.json({Status :"Success", Result:result})
    })
});


//update employee as admin
app.put("/update/:id", (req, res) => {
    const id = req.params.id ;
    const sql = "UPDATE employee set salary=? WHERE id = ?";
    con.query(sql, [req.body.salary, id], (err, result) => {
         if(err) return res.json({message : "Update Employee Error "});
        return res.json({Status :"Success"})
    })
});
//delete employee as admin
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id ;
    const sql = "DELETE FROM employee WHERE id = ?";
    con.query(sql, [id], (err, result) => {
         if(err) return res.json({message : "DELETE Employee Error "});
        return res.json({Status :"Success"})
    })
});

//count number of admins as admin
  app.get("/adminCount", (req, res) => {
    const sql = "Select count(id) as adminCount from users";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error : " users error count"});
        res.json(result);
    })
  });

//count number of employee as admin
  app.get("/employeeCount", (req, res) => {
    const sql = "Select count(id) as employeeCount from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error : " employee error count"});
        res.json(result);
    })
  });
 
//sum of all the salary in employee table  as admin
  app.get("/employeeSalary", (req, res) => {
    const sql = "Select sum(salary) as sumSalary from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error : " employee error count"});
        res.json(result);
    })
  })


//logout clear cookies
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({Status : "Success"});
})

//login as employee
app.post("/employee-login", (req, res) => {
    const sql = ("SELECT * FROM employee Where email= ?");
    con.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({status : "Error", message:"Error in executing query" });
        if(result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
                if(err) return res.json({status : "Error", Error:"Error in password" });
                if(response){
                       const id = result[0].id ;
            const token = jwt.sign({role:"employee", id: id}, "jwt-secret-token", {expiresIn : "2d"});
            res.cookie("token", token);
            return res.json({Status : "Success", id: id})
                }else{
                    return res.json({ Error : "Wrong Email or Password"})
                }
            })
         
        }else{
            return res.json({Status : "Error", message:"Wrong Email or Password"})
        }
    })
});


app.listen(8081, ()=> {
  console.log("Server Running")
})





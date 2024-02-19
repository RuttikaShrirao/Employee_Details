const express = require("express");
const mysql = require("./connection_db");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { isAlphabetical, reponseFormat } = require("./util");
const decodeTokenMiddleware = require('./middleware')
const dotenv = require('dotenv');
dotenv.config({ path: './.env' }); 

app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// const SECRET_KEY=process.env.SECRET_KEY
const SECRET_KEY='empAuthentication'

// registration
app.post("/registration",  (req,res)=>{
  const { email, password}=req.body
  const user_email = req.body.email;
  try{
if(((req.body.email).length==0) || ((req.body.password).length==0)){
  reponseFormat(res, status_code = 400, msg = "Please fiil Details..");
}
else{
  mysql.query("select * from authentication where email=? LIMIT 1",(user_email)  ,async (err, row) => {
    if(err){
      reponseFormat(res, status_code = 500, msg = "someThing wrong");
    }
    else{
      if(row.length != 0 ){
        reponseFormat(res, status_code = 500, msg ="This Email is Already registred");
      }
      else{
        const salt=await bcrypt.genSalt(5)
        let newpassword = password.toString();
        const hashedPassword= await bcrypt.hash(newpassword,salt)
        mysql.query("insert into authentication (email, password) values(? ,?)",[email,hashedPassword] , (err, row) => {
        
          if (err) {
            console.log(err);
          } 
          else {
            reponseFormat(res, status_code = 200, msg = "You are registred");
          }
        });
      }
    
    }
  })
}
}
catch(err){
  reponseFormat(res, status_code = 500, msg = "someThing wrong");
}
})

app.post('/login',(req,res)=>{
  const { email, password}=req.body
  const user_email = req.body.email;
  const user_password = req.body.password;
  try{
    if(((req.body.email).length==0) || ((req.body.password).length==0)){
      reponseFormat(res, status_code = 400, msg = "Please fiil Details..");
    }
    else{
        mysql.query("select * from authentication where email=?", (user_email), async(err, row)=>{
          if(err){
            reponseFormat(res, status_code = 500, msg = "someThing wrong");
          }
          else{
            if(row.length!=0){
              let newpassword = user_password.toString();
              const matchPassword= await bcrypt.compare(newpassword,row[0].password )
              if(matchPassword){
                 const token=jwt.sign({email:user_email,id:row.insertId}, SECRET_KEY)
                // reponseFormat(res, status_code = 200, msg = "You are logged in", user_token=token);
                res.send({status_code:200,msg:'you are logged in', token:token})
              }
              else{
                reponseFormat(res, status_code = 400, msg = "Incorrect Password");
              }
            }
              else{
                reponseFormat(res, status_code = 400, msg = "This Email not Exist");
              }
          }
        })
    }
  }
  catch(err){

  }
})

app.get("/",decodeTokenMiddleware, function (req, res) {
  mysql.query("select * from employee_info ", (err, row) => {
    if (err) {
      console.log(err);
    } else {
      // res.send(status_code=200,msg='authorize person')
      reponseFormat(res, status_code = 200, "", data = row);
    }
  });
});

app.get("/:id",decodeTokenMiddleware, function (req, res) {
  mysql.query("select * from employee_info where id=?",[req.params.id] ,(err, row) => {
    if (err) {
      console.log(err);
     return reponseFormat(res, status_code = 500, msg=err);
    }
    
    if (row.length ==0 ){
      return reponseFormat(res, status_code = 404, msg="not found.");
    }
    reponseFormat(res, status_code = 200, "", data = row[0]);    
  });
});

app.delete("/delete/:id",decodeTokenMiddleware, function (req, res) {
  mysql.query("DELETE from employee_info where id=?", [req.params.id] ,(err, dbConnectorRes) => {
    if (dbConnectorRes.affectedRows===0) {
      reponseFormat(res, status_code = 404, msg = "data not found");
    }
    else if(dbConnectorRes.affectedRows !=0){
      reponseFormat(res, status_code = 200, 
                              msg = "Your Data is deleted..");
    }
    else {
     console.log(err)
    }
  });
});

app.post("/",decodeTokenMiddleware, (req, res) => {
  const { first_name, salary } = req.body;
  if (typeof first_name != "string") {
    res.status(200).send({ massege: "Name is in String" });
  } else if (first_name === " ") {
    return res.status(200).send({ massege: "please fill name" });
  } else if (!isAlphabetical(first_name)) {
    // res
      // .status(401)
      // .send(
        reponseFormat(res, 
          status_code = 401,
          msg = "Special Charater is Not Valid"
        )
      // );
  } else if (typeof salary != "number") {
    // console.log(salary, typeof salary);
    res.status(200).send({ massege: "fill salary in number only" });
  } else if (
    typeof first_name == "string" &&
    isAlphabetical(first_name) &&
    typeof salary === "number"
  ) {
    const sql = "INSERT INTO employee_info (first_name,salary) VALUES (?, ?)";
    const values = [first_name, salary];
    mysql.query(sql, values, (result) => {
      console.log("Data inserted successfully");
      res.status(200).send({ massege: "Data inserted successfully" });
    });
  }
  else {
    console.error("Error inserting data: ");
    res.status(500).send({ massege: "Error inserting data" });
  }
});

app.patch("/:id",decodeTokenMiddleware, (req, res) => {
  const id =[req.params.id]
  const {first_name, salary} = req.body;

  if (!id) {
    return res.status(400).send("ID is required in the request body");
  }

  const sql = `
      UPDATE employee_info
      SET
      first_name = ?,
      salary  = ?
      WHERE
        id = ?
    ;`;

  const values = [first_name, salary, [req.params.id]];
  mysql.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      reponseFormat(res, status_code = 500, 
        msg = "error to Update Data.");
    } else {
      console.log("Data updated successfully");
      reponseFormat(res, status_code = 200, 
        msg = "Your Data is Updated..");
    }
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("server is running");
});

const connection= require('mysql2')
const mysql = connection.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'add_employees'
})
mysql.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('connect to db')
        
    }
})
module.exports=mysql
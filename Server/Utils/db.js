import mysql from 'mysql';

const con = mysql.createConnection({
host:"localhost",
user:"root",
password:'root123',
database:'ems'

})

con.connect(function(err){
    if(err){
        console.log("connection error:",err)
    }else{console.log("database connected")}
})

export default con;
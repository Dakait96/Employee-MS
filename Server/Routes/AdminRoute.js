import express from "express";
import con from "../Utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from 'multer'
import path from "path";

const router = express.Router();
"name", "email", "password", "address", "salary", "image";

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "querry error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id:result[0].id },
        "jwt_secret_web_token_confidential",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong Email or password" });
    }
  });
});
router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Querry Error" });
    if (result) return res.json({ Status: true, Result: result });
  });
});

router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Querry Error" });
    if (result) return res.json({ Status: true });
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})
const upload =  multer({
  storage: storage
})

router.post("/add_employee",upload.single('image'), (req, res) => {
  // console.log('req.body',req.body)
  const sql = `INSERT INTO employees 
 (name,email,password,salary,address,experience,category_id,image) VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Querry Error" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.salary,
      req.body.address,
      req.body.experience,
      req.body.category_id,
      req.file.filename,
    ]
    // console.log("values",values)
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: err });
       return res.json({ Status: true });
    });
  });
});

router.get("/employees", (req, res) => {
  const sql = "SELECT * FROM employees";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Querry Error" });
    if (result) return res.json({ Status: true, Result: result });
  });
});

router.get(`/employee/:id`,(req,res)=> {
const id = req.params.id;
const sql = "SELECT * FROM employees WHERE id = ?";
con.query(sql,[id],(err,result)=> {
  if(err) return res.json({Status:false,Error:'Querry Error'})
  return res.json({Status:true, Result: result})
})
})

router.put('/edit_employee/:id',(req,res)=>{
const id = req.params.id
const sql = "UPDATE employees set name = ?, email = ?, salary = ?,address = ?, experience = ?,category_id = ? WHERE id = ?"
const values = [
  req.body.name,
  req.body.email,
  req.body.salary,
  req.body.address,
  req.body.experience,
  req.body.category_id,
  
]
con.query(sql,[...values,id],(err,result)=>{
  if(err) return res.json({Status:false,Error:'Querry Error'})
  return res.json({Status:true, Result: result})
})
})

router.delete('/delete_employee/:id',(req,res)=>{
  const id = req.params.id
  const sql =  "delete from employees where id = ?"
  con.query(sql,[id],(err,result)=>{
    if(err) return res.json({Status:false,Error:'Querry Error'+err})
    return res.json({Status:true, Result: result})
  })
})
router.get('/count_admin',(req,res)=>{
  const sql = "select count(id) as admin from admin"
  con.query(sql,(err,result)=>{
    if(err) return res.json({Status:false,Error:'Querry Error'+err})
    return res.json({Status:true, Result: result})
  })
})
router.get('/count_employees',(req,res)=>{
  const sql = "select count(id) as employees from employees"
  con.query(sql,(err,result)=>{
    if(err) return res.json({Status:false,Error:'Querry Error'+err})
    return res.json({Status:true, Result: result})
  })
})
router.get('/count_salary',(req,res)=>{
  const sql = "select sum(salary) as salary from employees"
  con.query(sql,(err,result)=>{
    if(err) return res.json({Status:false,Error:'Querry Error'+err})
    return res.json({Status:true, Result: result})
  })
})
router.get('/admin_data',(req,res)=>{
  const sql = "select * from admin"
  con.query(sql,(err,result)=>{
    if(err) return res.json({Status:false,Error:'Querry Error'+err})
    return res.json({Status:true, Result: result})
  })
})
router.get('/logout', (req,res)=>{
   res.clearCookie('token')
   return res.json({Status:true })
})

export { router as adminRouter };

import express from 'express'
import con from '../Utils/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const router = express.Router()

router.post('/employee_login',(req,res)=> {
    const sql = 'SELECT * from employees where email = ?'
    con.query(sql,[req.body.email],(err,result)=>{
        if(err) return res.json({loginStatus:false,Error:"Querry Error"})
        if(result.length > 0){
            bcrypt.compare(req.body.password,result[0].password,(err,response)=>{
        if(err) return res.json({loginStatus:false,Error:"Wrong Password"})
        if(response){
            const email = result[0].email;
            const token = jwt.sign(
                {  role:'employee',email:email,id:result[0].id},
                "This_is_jwt_secret_Key",
                {expiresIn:'1d'}
            )
            res.cookie('token',token)
            return res.json({loginStatus:true,id:result[0].id})
        }
    })
        }else{
            return res.json({loginStatus:false,Error:"Wrong Email or Password"})
        }
});
});

router.get('/detail/:id',(req,res)=>{
    const id = req.params.id
    const sql = "Select * from employees where id =?"
    con.query(sql,[id],(err,result) => {
      if(err) return res.json({Status:false })
      return res.json({Status:true,Result:result})
    })
})

router.get('/logout', (req,res)=>{
   res.clearCookie('token')
   return res.json({Status:true })
})


 export {router as employeeRouter}
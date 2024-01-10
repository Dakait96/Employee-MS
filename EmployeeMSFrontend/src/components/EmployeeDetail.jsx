import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import "./styles.css"
const EmployeeDetail = () => {
const [employee,setEmployee] = useState([])
const navigate = useNavigate()
    const {id} = useParams()
   useEffect(()=>{
axios.get('http://localhost:3000/employee/detail/'+id)
.then(result=>{
    setEmployee(result.data.Result[0])
    // console.log("employee",result.data.Result)
})
.catch(err=> console.log(err))
   },[])
   const handleLogout = ()=>{
  axios.get('http://localhost:3000/employee/logout')
  .then(result=>{
    if(result.data.Status){
      localStorage.removeItem("valid")

        navigate('/')
    }
  })
   }
  return (
   <div className='profileBackground vh-100'>
   <div className="p2 d-flex justify-content-center shadow ">
   <h4>Employee Management System</h4>
   </div>
   <div className='d-flex flex-column justify-content-center align-items-center mt-3 w-25 m-auto rounded' style={{backgroundColor:'#90e0ef'}}>
   <div style={{borderRadius:'50%',}} className='my-4'>
   <img src={`http://localhost:3000/images/`+employee.image} alt="" style={{ maxWidth: '100%',
   height: 'auto',
   borderRadius:'20%',
   borderTopLeftRadius: 8,
   borderTopRightRadius: 8}}/>
   </div>
   <div className='text-center w-75'>
   <h4 style={{color:'#023e8a'}}>Name: {employee.name} </h4>
   <h5 style={{color:'#0077b6'}}>Email: {employee.email}</h5>
   <h5 style={{color:'#0077b6'}}>Salary: ${employee.salary}</h5>
   <h5 style={{color:'#0077b6'}}>Address: {employee.address}</h5>
   <h5 style={{color:'#0077b6'}}>Experience: {employee.experience}yrs</h5>

   </div>
   <div className='w-75 d-flex justify-content-around my-3'>
   <button className='btn btn-info '> Edit </button>
   <button className='btn  btn-danger' onClick={handleLogout}>Logout</button>
   </div>
   </div>
   </div>
  )
}

export default EmployeeDetail
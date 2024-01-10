import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import './styles.css'

const Start = () => {
  
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3000/verify')
      .then(result => {
        if (result.data.Status) {
          if (result.data.role === 'admin') {
            navigate('/dashboard')
          } else {
            navigate('/employee_detail/'+result.data.id)
          }
        } 
      }).catch(
        err => console.log(err)
      )
  }, [])
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bgimg'>
    <div className='p-3 rounded w-25 border bg-transparent' style={{backgroundColor:'#dad7cd'}}>
    <h2 className='text-center text-white w-100'>Login As An </h2>
    <div className='d-flex justify-content-between mt-5 mb-2 flex-wrap m-auto'>
    <button className='btn btn-sm btn-success m-1' onClick={()=> {navigate('/adminlogin')}}>Admin</button>
    <button className='btn btn-sm btn-success m-1' onClick={()=> {navigate('/employee_login')}}>Employe</button>
    </div>
    </div>
    </div>
  )
}

export default Start
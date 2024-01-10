import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Employee = () => {
const navigate = useNavigate()
  const [employees, setEmployees] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/auth/employees')
      .then(result => {
        if (result.data.Status) {
          setEmployees(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log("err", err))
  }, [])
  const handleDelete = (id)=>{
          axios.delete('http://localhost:3000/auth/delete_employee/'+id)
          .then(result=> {
            if(result.data.Status){
             window.location.reload()
            }else{
              console.log(result.data.err)
            }
          }

          )
          .catch(err=>{
                  console.log(err)}
          )
  }
  return (
    <div className=' pt-3' style={{backgroundColor:'#cdb4db'}} >
      <div className='d-flex justify-content-around py-1 text-white' style={{backgroundColor:'#03045e'}} >
        <h3 style={{margin:0}}>Employees List</h3>
        <Link to='/dashboard/add_employee' className='btn btn-success'>Add Employee
        </Link>
      </div>
      <div className=' table-responsive-sm bg-dark'  style={{height:'80vh', overflowY:'auto'}}>
        <table className='table table-dark table-hover '>
          <thead className=''>
            <tr>

              <th >Name</th>
              <th>Email</th>
              <th>Experience</th>
              <th className='text-wrap'>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody  style={{height:'60vh', overflowY:'auto'}}>
            {employees.map(e => (
              <tr key={e.id}>

                <td><img src={`http://localhost:3000/images/` + e.image} style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 5 }} />{e.name}</td>
                <td>{e.email}</td>
                <td>{e.experience}</td>
                <td>{e.address}</td>
                <td>
                  <Link to={`/dashboard/edit_employee/`+ e.id} className='btn btn-info btn-sm me-2'>Edit</Link>
                  <button className='btn btn-warning btn-sm' onClick={()=>handleDelete(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Employee
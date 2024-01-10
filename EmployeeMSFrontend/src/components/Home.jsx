import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Home = () => {
  const [totalAdmin, setTotalAdmin] = useState(0)
  const [totalEmployee, setTotalEmployee] = useState(0)
  const [totalSalary, setTotalSalary] = useState(0)
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    countAdmin();
    countEmployees();
    countSalary();
    adminData();
  }, [])
  const countAdmin = () => {
    axios.get('http://localhost:3000/auth/count_admin')
      .then(result => {
        if (result.data.Status) {

          setTotalAdmin(result.data.Result[0].admin)
        }
      })
  }
  const countEmployees = () => {
    axios.get('http://localhost:3000/auth/count_Employees')
      .then(result => {
        if (result.data.Status) {

          setTotalEmployee(result.data.Result[0].employees)
        }
      })
  }
  const countSalary = () => {
    axios.get('http://localhost:3000/auth/count_salary')
      .then(result => {
        if (result.data.Status) {

          setTotalSalary(result.data.Result[0].salary)
        }
      })
  }
  const adminData = () => {
    axios.get('http://localhost:3000/auth/admin_data')
      .then(result => {
        if (result.data.Status) {

          setAdmins(result.data.Result)
        }
      })

  }
  const handleDelete = () => {

  }
  return (
    <div style={{ backgroundColor: '#a2d2ff', height: '88vh' }}>
      <div className='d-flex justify-content-around p-3 pt-3 text-white' >
        <div className='px-2 pb-3 pt-2 border shadow-sm w-25 rounded' style={{ backgroundColor: '#264653' }}>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-around' >
            <h5>Total:</h5>
            <h5>{totalAdmin}</h5>
          </div>
        </div>
        <div className='px-2 pb-3 pt-2 border shadow-sm w-25 rounded' style={{ backgroundColor: '#264653' }}>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-around' >
            <h5>Total:</h5>
            <h5>{totalEmployee}</h5>
          </div>
        </div>
        <div className='px-2 pb-3 pt-2 border shadow-sm w-25 rounded' style={{ backgroundColor: '#264653' }}>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-around'>
            <h5>Total:</h5>
            <h5>${totalSalary}</h5>
          </div>
        </div>
      </div>
      <div className='mt-3 w-75 m-auto bg-dark rounded' style={{height:'55vh'}}>
        <h3 className='text-center mb-2'>ALL ADMINS</h3>

        <table className='table table-dark mt-2 table-hover' >
          <thead className=''>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            {admins.map(a => (
              <tr key={a.id}>
                <td>{a.email}</td>
                <td>
                  <button className='btn btn-info btn-sm me-2'>Edit</button>
                  <button className='btn btn-warning btn-sm' onClick={() => handleDelete(a.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Home
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EmployeeLogin = () => {
    const [error, setError] = useState(null)
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/employee/employee_login', values)
            .then(result => {
                if (result.data.loginStatus) {
                    localStorage.setItem("valid",true)

                    navigate('/employee_detail/'+result.data.id)
                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => console.log("err:", err))
        setValues({ ...values, email: '', password: '' })
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 bgimg text-white'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className="text-danger">{error && error}</div>
                <h2>Employee Login Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email:</strong> </label>
                        <input type="email" id='email' name='email' autoComplete='off' placeholder='Enter Email'
                            value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} className='form-control rounded-0 ' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password:</strong> </label>
                        <input type="password" name='password' autoComplete='off' placeholder='Enter Password'
                            value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-0 ' />
                    </div>
                    <button className='btn btn-success  rounded-0 mb-2'>Login</button>
                    <div className='mb-3'>
                        <label htmlFor='tic'>Agree Terms & Conditions</label>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default EmployeeLogin
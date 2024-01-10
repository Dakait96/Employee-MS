import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name:'',
        email:'',
        password:'',
        salary:'',
        address:'',
        experience:'',
        category_id:'',
        image:'',
    })
    const navigate = useNavigate();
    const [category, setCategory] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log("err", err))
    }, []
    )
    const handleSubmit =(e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('name',employee.name)
        formData.append('email',employee.email)
        formData.append('password',employee.password)
        formData.append('salary',employee.salary)
        formData.append('address',employee.address)
        formData.append('experience',employee.experience)
        formData.append('category_id',employee.category_id)
        formData.append('image',employee.image)

        axios.post('http://localhost:3000/auth/add_employee',formData)
        .then(result => {
                
                if (result.data.Status) {
                    navigate('/dashboard/employee')
                } else {
                    alert(result.data.Error)
                }

            })
        .catch(err=>console.log("err",err))
    }
    return(
        <div className='d-flex justify-content-center align-items-center h-auto mt-3 '>
            <div className='p-3 rounded w-50 border '>
                <h3 className='text-center'>ADD Employee</h3>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-between flex-wrap'>
                        <div className='mb-3'>
                            <label htmlFor='name'><strong>Name:</strong> </label> <br />
                            <input type="text" name='name' placeholder='Enter Name'
                                className='form-control rounded-0 ' 
                                onChange={(e)=> setEmployee({...employee,name:e.target.value})}
                                />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='email'><strong>Mail:</strong> </label> <br />
                            <input type="email" name='email' placeholder='Enter Email'
                                className='form-control rounded-0 '
                                onChange={(e)=> setEmployee({...employee,email:e.target.value})} />
                        </div>
                    </div>
                    <div className='d-flex justify-content-between flex-wrap'>
                        <div className='mb-3'>
                            <label htmlFor='password'><strong>Password:</strong> </label> <br />
                            <input type="password" name='password' placeholder='Enter Password'
                                className='form-control rounded-0 '
                                onChange={(e)=> setEmployee({...employee,password:e.target.value})} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='salary'><strong>Salary:</strong> </label> <br />
                            <input type="number" name='salary' placeholder='Enter Salary'
                                className='form-control rounded-0 '
                                onChange={(e)=> setEmployee({...employee,salary:e.target.value})} />
                        </div>

                    </div>
                    <div className='d-flex justify-content-between flex-wrap'>
                        <div className='mb-3'>
                            <label htmlFor='address'><strong>Address:</strong> </label> <br />
                            <input type="text" name='address' placeholder='Enter Address'
                                className='form-control rounded-0 '
                                onChange={(e)=> setEmployee({...employee,address:e.target.value})} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='experience'><strong>Experience:</strong> </label> <br />
                            <input type="number" name='experience' placeholder='Enter Experience'
                                className='form-control rounded-0 '
                                onChange={(e)=> setEmployee({...employee,experience:e.target.value})} />
                        </div>

                    </div>
                    <div className='d-flex justify-content-between flex-wrap'>
                        <div className='mb-3'>
                            <label htmlFor='category'><strong>Category:</strong> </label> <br />
                            <select name="category" id="category" 
                            onChange={(e)=> setEmployee({...employee,category_id:e.target.value})}>
                            <option value="">Select</option>
                                {category.map(c => (<option value={c.id} key={c.id} className='form-select'>{c.name}</option>))}
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='img'><strong>Image:</strong> </label> <br />
                            <input type="file" name='image' placeholder='Select Img'
                                className='form-control rounded-0 ' 
                                onChange={(e)=> setEmployee({...employee,image:e.target.files[0]})}/>
                        </div>
                    </div>





                    <button className='btn btn-success w-100 rounded-0 mb-2 '>Add Employee</button>

                </form>
            </div>
        </div>
    )
}

export default AddEmployee
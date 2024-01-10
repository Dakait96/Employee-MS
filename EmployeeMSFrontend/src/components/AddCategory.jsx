import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AddCategory = () => {
    const [category, setCategory] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_category', { category })
            .then(result => {
                
                if (result.data.Status) {
                    navigate('/dashboard/category')
                } else {
                    alert(result.data.Error)
                }

            })
            .catch(err => console.log("err:", err))

    }

    return (
        <div className='d-flex justify-content-center align-items-center h-75 '>
            <div className='p-3 rounded w-25 border '>
                <h3>Add Category</h3>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='addCategory'><strong>Category:</strong> </label> <br />
                        <input type="text" name='addCategory' placeholder='Enter Category'
                            value={category} onChange={(e) => setCategory(e.target.value)} className=' rounded-0 ' />
                    </div>

                    <button className='btn btn-success w-100 rounded-0 mb-2 '>Add Category</button>

                </form>
            </div>
        </div>
    )
}

export default AddCategory
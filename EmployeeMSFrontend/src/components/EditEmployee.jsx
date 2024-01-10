import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    experience: "",
    category_id: "",
    
  });
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log("err", err));

    axios
      .get(`http://localhost:3000/auth/employee/`+id)
      .then((result) => {
        console.log(result.data);
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          salary: result.data.Result[0].salary,
          address: result.data.Result[0].address,
          experience: result.data.Result[0].experience,
          category_id: result.data.Result[0].category_id,
        });
      })
      .catch((err) => console.log("err", err));
  }, []);
  const handleSubmit = (e)=>{
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/'+id,employee)
        .then(result=>{
            if(result.data.Status) {
                navigate('/dashboard/employee')
            } else {
                alert(result.data.Error)
            }
}
        )
        .catch(err=>console.log(err))
  }
  return (
    <div className="d-flex justify-content-center align-items-center h-auto mt-3 ">
      <div className="p-3 rounded w-50 border ">
        <h3 className="text-center">Edit Details</h3>
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between flex-wrap">
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name:</strong>
              </label>
              <br />
              <input
                type="text"
                name="name"
                value={employee.name}
                placeholder="Enter Name"
                className="form-control rounded-0 "
                onChange={(e) =>
                  setEmployee({ ...employee, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Mail:</strong>{" "}
              </label>{" "}
              <br />
              <input
                type="email"
                value={employee.email}
                name="email"
                placeholder="Enter Email"
                className="form-control rounded-0 "
                onChange={(e) =>
                  setEmployee({ ...employee, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            <div className="mb-3">
              <label htmlFor="salary">
                <strong>Salary:</strong>{" "}
              </label>{" "}
              <br />
              <input
                type="number"
                value={employee.salary}
                name="salary"
                placeholder="Enter Salary"
                className="form-control rounded-0 "
                onChange={(e) =>
                  setEmployee({ ...employee, salary: e.target.value })
                }
              />
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            <div className="mb-3">
              <label htmlFor="address">
                <strong>Address:</strong>{" "}
              </label>{" "}
              <br />
              <input
                type="text"
                value={employee.address}
                name="address"
                placeholder="Enter Address"
                className="form-control rounded-0 "
                onChange={(e) =>
                  setEmployee({ ...employee, address: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="experience">
                <strong>Experience:</strong>{" "}
              </label>{" "}
              <br />
              <input
                type="number"
                value={employee.experience}
                name="experience"
                placeholder="Enter Experience"
                className="form-control rounded-0 "
                onChange={(e) =>
                  setEmployee({ ...employee, experience: e.target.value })
                }
              />
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            <div className="mb-3">
              <label htmlFor="category">
                <strong>Category:</strong>{" "}
              </label>{" "}
              <br />
              <select
                name="category"
                id="category"
                onChange={(e) =>
                  setEmployee({ ...employee, category_id: e.target.value })
                }
              >
                {category.map((c) => (
                  <option value={c.id} key={c.id} className="form-select">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
       
          </div>

          <button className="btn btn-success w-100 rounded-0 mb-2 ">
            Edit Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;

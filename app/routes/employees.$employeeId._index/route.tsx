import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export async function loader() {
  return {}
}

export default function EmployeePage() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    department: "",
    salary: "",
    startDate: "",
    endDate: "",
  });

  useEffect(()=>{
    fetch(`/api/employees/${id}`).then((res) => res.json()).then((data) => setEmployee(data));
  },
[id]);

const handleEdits = (e: React.ChangeEvent<HTMLInputElement>) =>{
  setEmployee({...employee, [e.target.name]: e.target.value});
}

const handleSubmits = async (e: React.FormEvent) =>{
  e.preventDefault();
  await fetch(`/api/employees/${id}`,{
    method: "PUT",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(employee),
  });
  navigate("/employees"); //to see if the changes were sent to the db and the fields changed :)
}


  return (
    <div>
      <div>
        <h1>Edit Employee</h1>
        <form onSubmit={handleSubmits}>
          <label>Full Name</label>
          <input type="text" name="fullName" value={employee.fullName} onChange={handleEdits} required/>

          <label>Email:</label>
        <input type="email" name="email" value={employee.email} onChange={handleEdits} required />

        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={employee.phoneNumber} onChange={handleEdits} required />

        <label>Job Title:</label>
        <input type="text" name="jobTitle" value={employee.jobTitle} onChange={handleEdits} required />

        <label>Department:</label>
        <input type="text" name="department" value={employee.department} onChange={handleEdits} required />

        <button type="submit">Update Employee</button>
        </form>
      </div>
      <ul>
        <li><a href="/employees">Employees</a></li>
        <li><a href="/employees/new">New Employee</a></li>
        <li><a href="/timesheets/">Timesheets</a></li>
      </ul>
    </div>
  )
}

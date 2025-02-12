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
    phone_number: "",
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
        To implement
      </div>
      <ul>
        <li><a href="/employees">Employees</a></li>
        <li><a href="/employees/new">New Employee</a></li>
        <li><a href="/timesheets/">Timesheets</a></li>
      </ul>
    </div>
  )
}

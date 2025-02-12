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
[id])


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

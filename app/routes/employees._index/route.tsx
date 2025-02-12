import { useLoaderData } from "react-router"
import { getDB } from "~/db/getDB"
import { Link } from "react-router";
import { useState } from "react";

export async function loader() {
  
  const db = await getDB()
  const employees = await db.all("SELECT * FROM employees;" )

  return { employees }
}

export default function EmployeesPage() {
  const { employees } = useLoaderData();

  const [search, setSearch] = useState("");

  const filteredSearch = employees.filter((employee:any) =>
    employee.fullName.toLowerCase().includes(search.toLowerCase()) || 
    employee.email.toLowerCase().includes(search.toLowerCase()) || 
    employee.phoneNumber.toLowerCase().includes(search.toLowerCase()) || 
    employee.department.toLowerCase().includes(search.toLowerCase()) ||
    employee.jobTitle.toLowerCase().includes(search.toLowerCase()) 

  );

  return (
    <div>

<div>
<input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

<div>
        {filteredSearch.length > 0 ? (
          <ul>
            {filteredSearch.map((employee:any) => (
              <div>
              
               
              <ul>
              <li>Employee #{employee.id}</li>
                <ul>
                <li key={employee.id}>
                <Link to={`/employees/${employee.id}/view/`}>{employee.fullName}</Link>
              </li>
                  <li>Email: {employee.email}</li>
                  <li>Phone Number: {employee.phoneNumber}</li>
                  <li>Job Title: {employee.jobTitle}</li>
                  <li>Department: {employee.department}</li>
                  <li>Salary: ${employee.salary}</li>
                  <li>Start Date: {employee.startDate}</li>
                  <li>End Date: {employee.endDate || "N/A"}</li>
              <li>
              Photo: {employee.photoPath ? (
                <img src={employee.photo_path} alt="Employee Photo" width="100" />
              ) : "No photo available"}
            </li>
            <li>
              Documents: {employee.documentPath ? (
                <a href={employee.documentPath} target="_blank" rel="noopener noreferrer">View Document</a>
              ) : "No documents available"}
            </li>
          </ul>
            </ul>
                </div>
            ))}
          </ul>
        ) : (
          <p>No employees found</p>
        )}
      </div>
      </div>
     
    </div>
  )
}

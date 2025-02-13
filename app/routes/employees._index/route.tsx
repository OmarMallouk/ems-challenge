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
  const [sortBy, setSortBy] = useState<"name" | "salary">("name"); 
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); 

  const filteredSearch = employees.filter((employee:any) =>
    employee.fullName.toLowerCase().includes(search.toLowerCase()) || 
    employee.email.toLowerCase().includes(search.toLowerCase()) || 
    employee.phoneNumber.toLowerCase().includes(search.toLowerCase()) || 
    employee.department.toLowerCase().includes(search.toLowerCase()) ||
    employee.jobTitle.toLowerCase().includes(search.toLowerCase()) 

  );

  const sortedEmployees = [...filteredSearch].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.fullName.localeCompare(b.fullName)
        : b.fullName.localeCompare(a.fullName);
    }
    if (sortBy === "salary") {
      return sortOrder === "asc" ? a.salary - b.salary : b.salary - a.salary;
    }
    return 0;
  });

  return (
    <div>

<div>
<input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      </div>

      <div>
        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "name" | "salary")}>
          <option value="name">Name</option>
          <option value="salary">Salary</option>
        </select>

        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          {sortOrder === "asc" ? "🔼 Ascending" : "🔽 Descending"}
        </button>
      </div>

<div>
        {sortedEmployees.length > 0 ? (
          <ul>
            {sortedEmployees.map((employee:any) => (
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
<ul>
        <li><a href="/employees/new">New Employee</a></li>
        <li><a href="/timesheets/">Timesheets</a></li>
      </ul>
      </div>

  )
}

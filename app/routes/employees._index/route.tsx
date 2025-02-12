import { useLoaderData } from "react-router"
import { getDB } from "~/db/getDB"
import { Link } from "react-router"

export async function loader() {
  const db = await getDB()
  const employees = await db.all("SELECT * FROM employees;")

  return { employees }
}

export default function EmployeesPage() {
  const { employees } = useLoaderData()
  return (
    <div>
      <div>
        {employees.map((employee: any) => (
          <div>
            <ul>
              <li>Employee #{employee.id}</li>
                <ul>
                  <li>Full Name: {employee.fullName}</li>
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
            <Link to={`/employees/${employee.id}/`}>
            <button>Edit</button>
            </Link>
        
          </div>
        ))}
      </div>
      <hr />
      <ul>
        <li><a href="/employees/new">New Employee</a></li>
        <li><a href="/timesheets/">Timesheets</a></li>
      </ul>
    </div>
  )
}

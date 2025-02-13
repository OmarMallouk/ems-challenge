import { useLoaderData, redirect, Form  } from "react-router";
import { getDB } from "~/db/getDB";
import type  { Params, ActionFunction  } from "react-router";

export async function loader({ params }: { params: any }) {
  const { employeeId } = params;
  const db = await getDB();
  
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", [employeeId]);

  if (!employeeId) {
    throw new Response("employee not found", { status: 404 });
  }

  return { employee};
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const id = formData.get("id");
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const phoneNumber = formData.get("phoneNumber");
  const jobTitle = formData.get("jobTitle");
  const department = formData.get("department");
  const { employeeId } = params;

  const db = await getDB();
  await db.run(
    "UPDATE employees SET fullName = ?, email = ?, phoneNumber = ?, jobTitle = ?, department = ? WHERE id = ?",
    [fullName, email, phoneNumber, jobTitle, department, employeeId]
  );

  return redirect("/employees");
};

export default function EmployeePage() {
  const { employee} = useLoaderData();

  return (
    <div>
      <div>
        <h1>Edit Employee</h1>
        <Form method="post">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" name="fullName" id="fullName" value={employee.fullName} />

          <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" value={employee.email}  />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="text" name="phoneNumber" id="phoneNumber" value={employee.phoneNumber}  />

        <label htmlFor="jobTitle">Job Title:</label>
        <input type="text" name="jobTitle" id="jobTitle" defaultValue={employee.jobTitle}  />

        <label htmlFor="department">Department:</label>
        <input type="text" name="department" id="department" defaultValue={employee.department}  />

        <button type="submit">Update Employee</button>
        </Form>
      </div>
      <ul>
        <li><a href="/employees">Employees</a></li>
        <li><a href="/employees/new">New Employee</a></li>
        <li><a href="/timesheets/">Timesheets</a></li>
      </ul>
    </div>
  )
}

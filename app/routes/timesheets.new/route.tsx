import { useLoaderData, Form, redirect } from "react-router";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();
  const employees = await db.all('SELECT id, fullName FROM employees');
  return { employees }; 
}


import type { ActionFunction } from "react-router";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id"); 
  const work_summary = formData.get("work_summary");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");

  const db = await getDB();
  await db.run(
    'INSERT INTO timesheets (employee_id, work_summary, start_time, end_time) VALUES (?,?, ?, ?)',
    [employee_id, work_summary, start_time, end_time]
  );

  return redirect("/timesheets");
}

export default function NewTimesheetPage() {
  const { employees } = useLoaderData(); 
  return (
    <div>
      <h1>Create New Timesheet</h1>
      <Form method="post">
        <div>
        <label htmlFor="employee_id">Select Employee:</label>
        <select name="employee_id" id="employee_id" required>
          <option value="" disabled selected>Click to choose</option>
          {employees.map((employee:any) =>(
            
            
            <option key={employee.id} value={employee.id}>{employee.fullName}</option>
          
          ) )}
          </select>
        </div>
        <label htmlFor="employee_id">Summary</label>
        <input type="text" name="work_summary" id="work_summary" required  title="Enter a summary" />
        <div>
          <label htmlFor="start_time">Start Time</label>
          <input type="datetime-local" name="start_time" id="start_time" required />
        </div>
        <div>
          <label htmlFor="end_time">End Time</label>
          <input type="datetime-local" name="end_time" id="end_time" required />
        </div>
        <button type="submit">Create Timesheet</button>
      </Form>
      <hr />
      <ul>
        <li><a href="/timesheets">Timesheets</a></li>
        <li><a href="/employees">Employees</a></li>
      </ul>
    </div>
  );
}

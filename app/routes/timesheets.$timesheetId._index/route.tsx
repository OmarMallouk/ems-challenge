import { useLoaderData, redirect, Form  } from "react-router"
import { getDB } from "~/db/getDB"
import { Link } from "react-router"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import type  { Params, ActionFunction  } from "react-router"

export async function loader({ params }: { params: any }) {
  const { timesheetId } = params;
  const db = await getDB();
  
  const timesheet = await db.get("SELECT * FROM timesheets WHERE id = ?", [timesheetId]);
  const employees = await db.all("SELECT id, fullName FROM employees");

  if (!timesheet) {
    throw new Response("Timesheet not found", { status: 404 });
  }

  return { timesheet, employees };
}


export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");
  const work_summary = formData.get("work_summary");
  const { timesheetId } = params;

  const db = await getDB();
  await db.run(
    "UPDATE timesheets SET employee_id = ?, start_time = ?, end_time = ?, work_summary = ? WHERE id = ?",
    [employee_id, start_time, end_time, work_summary, timesheetId]
  );

  return redirect("/timesheets");
};


export default function TimesheetPage() {
  const {timesheet, employees} = useLoaderData();

  return (
    <div>
      <div>
       <h1>Update Timesheet</h1>
      <Form method="post">
        <div>
          <label htmlFor="employee_id">Select Employee:</label>
          <select name="employee_id" id="employee_id" defaultValue={timesheet.employee_id} required>
            <option value="" disabled>Click to choose</option>
            {employees.map((employee: any) => (
              <option key={employee.id} value={employee.id}>
                {employee.fullName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="start_time">Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            id="start_time"
            defaultValue={timesheet.start_time}
            required
          />
        </div>

        <div>
          <label htmlFor="end_time">End Time</label>
          <input
            type="datetime-local"
            name="end_time"
            id="end_time"
            defaultValue={timesheet.end_time}
            required
          />
        </div>

        <div>
          <label htmlFor="work_summary">Summary</label>
          <input
            type="text"
            name="work_summary"
            id="work_summary"
            defaultValue={timesheet.work_summary}
          />
        </div>

        <button type="submit">Update Timesheet</button>
      </Form>
      </div>
      <ul>
        <li><a href="/timesheets">Timesheets</a></li>
        <li><a href="/timesheets/new">New Timesheet</a></li>
        <li><a href="/employees/">Employees</a></li>
      </ul>
    </div>
  )
}



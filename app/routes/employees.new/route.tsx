import { Form, redirect, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";
import styles from "./employees.module.css";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const phoneNumber = formData.get("phoneNumber");
  const jobTitle = formData.get("jobTitle");
  const salary = formData.get("salary");
  const department = formData.get("department");
  const dateOfBirth = formData.get("dateOfBirth");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const photoPath = formData.get("photoPath");
  const documentPath = formData.get("documentPath");

  const db = await getDB();
  await db.run(
    'INSERT INTO employees (fullName, email, phoneNumber, jobTitle, department, salary, dateOfBirth, startDate, endDate, photoPath, documentPath) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [fullName,
      email,
      phoneNumber,
      jobTitle,
      department,
      salary,
      dateOfBirth,
      startDate,
      endDate || null, 
      photoPath || null, 
      documentPath || null 
    ]
  );

  return redirect("/employees");
}

export default function NewEmployeePage() {
  return (
    <div>
      <h1>Create New Employee</h1>
      <Form method="post" encType="multipart/form-data">
        <div className={styles.main}>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" name="fullName" id="fullName" required  minLength={3} />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />

          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" name="phoneNumber" id="phoneNumber" required  title="Enter a valid phone number" />

          <label htmlFor="jobTitle">Job Title</label>
          <input type="text" name="jobTitle" id="jobTitle" required />

          <label htmlFor="department">Department</label>
          <input type="text" name="department" id="department" required />

          <label htmlFor="salary">Salary</label>
          <input type="text" name="salary" id="salary" required  min="700" />

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input type="date" name="dateOfBirth" id="dateOfBirth" required />


          <label htmlFor="startDate">Start Date</label>
          <input type="date" name="startDate" id="startDate" required />

          <label htmlFor="endDate">End Date</label>
          <input type="date" name="endDate" id="endDate" required />

          <label htmlFor="photoPath">Photo</label>
          <input type="file" name="photoPath" id="photoPath" accept="image/*" />

          <label htmlFor="documentPath">Document</label>
          <input type="file" name="documentPath" id="documentPath" accept=".pdf,.doc,.docx" />
        </div>
        <button type="submit">Create Employee</button>

      </Form>
      <hr />
      <ul>
        <li><a href="/employees">Employees</a></li>
        <li><a href="/timesheets">Timesheets</a></li>
      </ul>
    </div>
  );
}

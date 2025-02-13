import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import { getDB } from "~/db/getDB";
import { Link } from "react-router";
import styles from "./timesheet.module.css"

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export async function loader() {
  const db = await getDB();
  const timesheetsAndEmployees = await db.all(
    "SELECT timesheets.*, employees.fullName, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id"
  );

  return { timesheetsAndEmployees };
}

export default function TimesheetsPage() {
  const { timesheetsAndEmployees } = useLoaderData();
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [table, setTable] = useState(false);
  const [search, setSearch] = useState("");


  const handleDateChange = (newDate:any) => {
    setDate(newDate);
  };

  const toggleCalendarView = () => {
    setShowCalendar((prev) => !prev);
    setTable(false);
  };


  const toggleTableView = () => {
    setTable((prev) => !prev);
    setShowCalendar(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredTimesheets = timesheetsAndEmployees.filter((timesheet:any) =>
    (timesheet.work_summary && timesheet.work_summary.toLowerCase().includes(search.toLowerCase())) ||
    (timesheet.id.toString().includes(search))
  );

  return (
    <div>

<input
  type="text"
  placeholder="Search by ID or Summary"
  value={search}
  onChange={handleSearch}
/>

{filteredTimesheets.map((timesheet:any) => (
    <div key={timesheet.id}>
    <ul>
      <li>Timesheet #{timesheet.id}</li>
      <ul>
        <li>Employee: {timesheet.full_name} (ID: {timesheet.employee_id})</li>
        <li>Start Time: {timesheet.start_time}</li>
        <li>End Time: {timesheet.end_time}</li>
        <li>Summary: {timesheet.work_summary}</li>
      </ul>
    </ul>
    <Link to={`/timesheets/${timesheet.id}/`}>
    <button>Edit</button>
    </Link>
  </div>
))}
      <div>
      <button onClick={toggleTableView}>{table ? "Hide Table" : "View Table"}</button>
        <div>
      <button onClick={toggleCalendarView}>
        {showCalendar ? "Hide Calendar" : "Calendar View"}
      </button>

      {showCalendar && (
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={({ date }) => {
            const timesheet = timesheetsAndEmployees.find(
              (timesheet:any) => new Date(timesheet.start_time).toLocaleDateString() === date.toLocaleDateString()
            );
            return timesheet ? <div>{timesheet.fullName}</div> : null;
          }}
        />
      )}
    </div>


{table && (
  <table>
    <thead>
      <tr>
        <th>Timesheet #</th>
        <th>Employee</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Summary</th>
      </tr>
    </thead>
    <tbody>
      {timesheetsAndEmployees.map((timesheet:any) => (
        <tr key={timesheet.id}>
          <td>{timesheet.id}</td>
          <td>{timesheet.full_name}</td>
          <td>{timesheet.start_time}</td>
          <td>{timesheet.end_time}</td>
          <td>{timesheet.work_summary}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}
     
      </div>
    
      <hr />

      
      <ul>
        <li><a href="/timesheets/new">New Timesheet</a></li>
        <li><a href="/employees">Employees</a></li>
      </ul>
    </div>
  );
}

import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import { getDB } from "~/db/getDB";
import { Link } from "react-router";

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


  const handleDateChange = (newDate:any) => {
    setDate(newDate);
  };

  const toggleCalendarView = () => {
    setShowCalendar((prev) => !prev);
  };


  return (
    <div>
      <div>
        <button>Table View</button>
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
     
      </div>
      {/* Replace `true` by a variable that is changed when the view buttons are clicked */}
      {true ? (
        <div>
          {timesheetsAndEmployees.map((timesheet: any) => (
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
        </div>
      ) : (
        <div>
          <p>
            To implement, see <a href="https://schedule-x.dev/docs/frameworks/react">Schedule X React documentation</a>.
          </p>
        </div>
      )}
      <hr />
      <ul>
        <li><a href="/timesheets/new">New Timesheet</a></li>
        <li><a href="/employees">Employees</a></li>
      </ul>
    </div>
  );
}

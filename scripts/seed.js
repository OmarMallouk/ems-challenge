import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, '../database.yaml');
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, 'utf8'));

const {
  'sqlite_path': sqlitePath,
} = dbConfig;

const db = new sqlite3.Database(sqlitePath);

const employees = [
  {
    fullName: 'John Doe',
    email: 'john@gmail.com',
    phoneNumber: '1234567890',
    jobTitle: 'Software Engineer',
    department: 'IT',
    salary: 700,
    startDate: '2022-01-01',
    endDate: null,
    photoPath: '/uploads/john_doe.jpg',
    documentPath: '/uploads/john_doe_cv.pdf'
  },
  { fullName: 'Vin Diesel',
    email: 'vin@gmail.com',
    phoneNumber: '9876543210',
    jobTitle: 'Actor',
    department: 'Entertainment',
    salary: 9000,
    startDate: '2000-06-10',
    endDate: null,
    photoPath: '/uploads/vin_diesel.jpg',
    documentPath: '/uploads/vin_diesel_cv.pdf'
   },

];

const timesheets = [
  {
    employee_id: 1,
    start_time: '2025-02-10 08:00:00',
    end_time: '2025-02-10 17:00:00',
  },
  {
    employee_id: 2,
    start_time: '2025-02-11 12:00:00',
    end_time: '2025-02-11 17:00:00',
  }
  // {
  //   employee_id: 3,
  //   start_time: '2025-02-12 07:00:00',
  //   end_time: '2025-02-12 16:00:00',
  // },
  // { employee_id: 4, start_time: '2025-02-13 09:00:00',
  //    end_time: '2025-02-13 18:00:00' }, 
  // { employee_id: 5, start_time: '2025-02-14 10:00:00',
  //    end_time: '2025-02-14 19:00:00' }
];


const insertData = (table, data) => {
  const columns = Object.keys(data[0]).join(', ');
  const placeholders = Object.keys(data[0]).map(() => '?').join(', ');

  const insertStmt = db.prepare(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`);

  data.forEach(row => {
    insertStmt.run(Object.values(row));
  });

  insertStmt.finalize();
};

db.serialize(() => {
  insertData('employees', employees);
  insertData('timesheets', timesheets);
});

db.close(err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Database seeded successfully.');
  }
});


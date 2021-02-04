const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const values = [`%${process.argv[2]}%`]

pool.query(`
SELECT teachers.name as teacher_name, cohorts.name as cohort_name, COUNT(assistance_requests.*) as total_assistances
FROM cohorts 
JOIN students ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = student_id
JOIN teachers ON teacher_id = teachers.id
WHERE cohorts.name LIKE $1
GROUP BY teachers.name, cohorts.name
ORDER BY teachers.name;
`, values)
.then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort_name} : ${user.teacher_name}`);
    })
  })
.catch(err => console.error('query error', err.stack));

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;

const values = [`%${cohortName}%`, limit];

pool.query(`
SELECT students.id as s_id, students.name as s_name, cohorts.name as cohort_name
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, values)
.then(res => {
    console.log(res.rows);
    res.rows.forEach(user => {
      console.log(`${user.s_name} has an id of ${user.s_id} and was in the ${user.cohort_name} cohort`);
    })
  })
.catch(err => console.error('query error', err.stack));

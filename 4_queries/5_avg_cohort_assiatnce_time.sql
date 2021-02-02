SELECT cohorts.name, AVG(completed_at - started_at) as average_assistance_time
FROM COHORTS 
JOIN students ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = student_id
GROUP BY cohorts.name
ORDER BY average_assistance_time;
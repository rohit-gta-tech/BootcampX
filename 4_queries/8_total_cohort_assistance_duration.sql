SELECT cohorts.name as cohort, SUM(completed_at - started_at) as total_duration
FROM COHORTS 
JOIN students ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = student_id
GROUP BY cohorts.name
ORDER BY total_duration;
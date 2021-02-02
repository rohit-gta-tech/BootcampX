SELECT assignments.id, name, day, chapter, count(*)
FROM assignments 
JOIN assistance_requests ON assignments.id = assignment_id
GROUP BY assignments.id
ORDER BY count(*) DESC;
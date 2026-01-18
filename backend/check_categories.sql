-- Check all categories
SELECT id, name, slug FROM "Category" ORDER BY name;

-- Check service counts by category name
SELECT c.name, c.id, COUNT(s.id) as service_count 
FROM "Category" c 
LEFT JOIN "Service" s ON s."categoryId" = c.id 
GROUP BY c.id, c.name 
ORDER BY service_count DESC;

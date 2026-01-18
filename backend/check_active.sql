-- Check if category names match between services and displayed categories
SELECT 
  c.name as category_name,
  c.slug,
  c."isActive" as category_active,
  COUNT(s.id) as service_count
FROM "Category" c
LEFT JOIN "Service" s ON s."categoryId" = c.id AND s."isActive" = true
GROUP BY c.id, c.name, c.slug, c."isActive"
ORDER BY c."sortOrder";

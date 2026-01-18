SELECT COUNT(*) as total, platform FROM "Service" GROUP BY platform ORDER BY total DESC;
SELECT COUNT(*) as total_services FROM "Service";

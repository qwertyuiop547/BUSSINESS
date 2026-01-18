-- Check if services have isActive = false
SELECT platform, "isActive", COUNT(*) as count 
FROM "Service" 
GROUP BY platform, "isActive" 
ORDER BY platform, "isActive";

-- Check services without category
SELECT COUNT(*) as no_category FROM "Service" WHERE "categoryId" IS NULL;

-- Sample of YouTube services
SELECT id, name, "categoryId", "isActive" FROM "Service" WHERE platform = 'YOUTUBE' LIMIT 5;

-- Sample of Twitter services
SELECT id, name, "categoryId", "isActive" FROM "Service" WHERE platform = 'TWITTER' LIMIT 5;

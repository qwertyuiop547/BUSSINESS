-- Delete Other services as well
DELETE FROM "Service" WHERE platform = 'OTHER';

-- Deactivate empty categories (Telegram, Spotify, Other)
UPDATE "Category" SET "isActive" = false WHERE slug IN ('telegram', 'spotify', 'other');

-- Verify remaining services
SELECT platform, COUNT(*) as count FROM "Service" GROUP BY platform ORDER BY count DESC;

-- Verify active categories
SELECT name, slug, "isActive" FROM "Category" ORDER BY "sortOrder";

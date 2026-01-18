-- Enable Others as Coming Soon
UPDATE "Category" SET "isActive" = true WHERE slug = 'other';

-- Verify
SELECT name, slug, "isActive" FROM "Category" ORDER BY "sortOrder";

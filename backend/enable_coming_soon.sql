-- Re-enable Telegram and Spotify as Coming Soon (but keep Other hidden)
UPDATE "Category" SET "isActive" = true WHERE slug IN ('telegram', 'spotify');

-- Verify
SELECT name, slug, "isActive" FROM "Category" ORDER BY "sortOrder";

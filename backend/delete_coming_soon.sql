-- Delete Telegram and Spotify services (they should be Coming Soon)
DELETE FROM "Service" WHERE platform = 'TELEGRAM';
DELETE FROM "Service" WHERE platform = 'SPOTIFY';

-- Verify
SELECT platform, COUNT(*) as count FROM "Service" GROUP BY platform ORDER BY count DESC;

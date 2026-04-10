-- Disable CheapPanel provider and clear API credentials
UPDATE "Provider" 
SET 
  status = 'INACTIVE', 
  "apiKey" = '', 
  "apiUrl" = '',
  "updatedAt" = NOW()
WHERE 
  name = 'CheapPanel' 
  OR "apiUrl" LIKE '%cheappanel%';

-- Show result
SELECT id, name, status, "apiUrl" FROM "Provider";

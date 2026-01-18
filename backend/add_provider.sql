-- Add CheapPanel provider
INSERT INTO "Provider" (id, name, "apiUrl", "apiKey", status, description, "createdAt", "updatedAt")
VALUES (
  'cheappanel_provider',
  'CheapPanel',
  'https://cheappanel.com/api/v2',
  '494a05cc345e8012ee25f3a059cf4462',
  'ACTIVE',
  'CheapPanel SMM Services Provider',
  NOW(),
  NOW()
)
ON CONFLICT (name) DO UPDATE SET
  "apiUrl" = EXCLUDED."apiUrl",
  "apiKey" = EXCLUDED."apiKey",
  status = 'ACTIVE',
  "updatedAt" = NOW();

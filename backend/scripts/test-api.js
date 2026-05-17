const https = require('https');

const url = 'https://peakerr.com/api/v2?key=41703b61dc18b1e5dff1283375e14fd6&action=services';

console.log('Testing Peakerr API...');
console.log('URL:', url);

const req = https.get(url, { timeout: 30000 }, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers['content-type']);
  
  let data = '';
  res.on('data', chunk => {
    data += chunk;
    if (data.length > 1000 && !data.includes('[')) {
      console.log('First 500 chars:', data.slice(0, 500));
    }
  });
  
  res.on('end', () => {
    console.log('Response length:', data.length);
    try {
      const json = JSON.parse(data);
      if (Array.isArray(json)) {
        console.log('Services count:', json.length);
        if (json[0]) console.log('First service:', json[0]);
      } else {
        console.log('Response:', json);
      }
    } catch (e) {
      console.log('Parse error:', e.message);
      console.log('Raw data (first 500):', data.slice(0, 500));
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.on('timeout', () => {
  console.error('Request timeout');
  req.destroy();
});

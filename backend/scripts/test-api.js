const http = require('http');

// Try the authenticated services endpoint
const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/services?limit=1000',
    method: 'GET'
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log('Response status:', res.statusCode);
        try {
            const json = JSON.parse(data);
            console.log('Total services from API:', json.data?.length || 0);

            // Get all unique categories
            const categories = {};
            json.data?.forEach(s => {
                const catName = s.category?.name || 'Unknown';
                if (!categories[catName]) categories[catName] = 0;
                categories[catName]++;
            });

            console.log('\nServices by category:');
            for (const [cat, count] of Object.entries(categories).sort((a, b) => b[1] - a[1])) {
                console.log(`  ${cat}: ${count}`);
            }
        } catch (e) {
            console.log('Response:', data.substring(0, 500));
        }
    });
});

req.on('error', (e) => console.error('Error:', e.message));
req.end();

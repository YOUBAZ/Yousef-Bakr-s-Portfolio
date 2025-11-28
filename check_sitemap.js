import https from 'https';

const urls = [
    'https://yousef-bakr-s-portfolio.vercel.app/sitemap.xml',
    'https://yousef-bakr-s-portfolio.vercel.app/robots.txt'
];

function checkUrl(index) {
    if (index >= urls.length) return;
    const url = urls[index];
    https.get(url, (res) => {
        console.log(`\nURL: ${url}`);
        console.log(`Status: ${res.statusCode}`);
        console.log(`Content-Type: ${res.headers['content-type']}`);
        console.log(`X-Robots-Tag: ${res.headers['x-robots-tag'] || 'Not Set'}`);
        res.resume(); // Consume response to free memory
        res.on('end', () => checkUrl(index + 1));
    }).on('error', (e) => {
        console.error(`Error fetching ${url}:`, e);
        checkUrl(index + 1);
    });
}

checkUrl(0);

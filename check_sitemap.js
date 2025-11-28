import https from 'https';

const urls = [
    'https://yousef-bakr-s-portfolio.vercel.app/sitemap.xml',
    'https://yousef-bakr-s-portfolio.vercel.app/robots.txt'
];

urls.forEach(url => {
    https.get(url, (res) => {
        console.log(`\nURL: ${url}`);
        console.log('Status Code:', res.statusCode);
        console.log('Content-Type:', res.headers['content-type']);

        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            console.log('Content Preview:', data.substring(0, 50).replace(/\n/g, ' '));
        });
    }).on('error', (e) => {
        console.error(`Error fetching ${url}:`, e);
    });
});

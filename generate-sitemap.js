import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

async function generateSitemap() {
    const hostname = 'https://topdrivegroup.com/';

    const smStream = new SitemapStream({ hostname });
    smStream.write({ url: '/', changefreq: 'weekly', priority: 1.0 });
    smStream.write({ url: '/ecommerce', changefreq: 'monthly', priority: 0.9 });
    smStream.write({ url: '/ecommerce/quotations', changefreq: 'monthly', priority: 0.8 });
    smStream.write({ url: '/ecommerce/contact-us', changefreq: 'monthly', priority: 0.8 });
    smStream.end();

    const sitemapXML = await streamToPromise(smStream);
    const filePath = resolve('./public/sitemap.xml');
    const writeStream = createWriteStream(filePath);

    // Write the XML directly to the write stream
    writeStream.write(sitemapXML);
    writeStream.end();

    return new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
}

generateSitemap()
    .then(() => console.log('Sitemap generated successfully.'))
    .catch((error) => console.error('Error generating sitemap:', error));
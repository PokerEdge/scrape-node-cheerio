const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

// Write headers of CSV file with a new line at the end
writeStream.write(`Title, Link, Date \n`);

request('http://codedemos.com/sampleblog/', (error, response, html) => {
    if(!error && response.statusCode == 200) {
       const $ = cheerio.load(html);

       $('.post-preview').each((i, el) => {
           const title = $(el)
                .find('.post-title')
                .text()
                .replace(/\s\s+/g, '');

            const link = $(el)
                .find('a')
                .attr('href');

            const date = $(el)
                .find('.post-date')
                .text()
                .replace(/,/, '');

            // Write row to CSV file with a new line at the end
            writeStream.write(`${title}, ${link}, ${date} \n`);
       }); 
       console.log('Scraping complete.');
    }
});
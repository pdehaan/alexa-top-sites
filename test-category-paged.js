const { getPages, byCategory } = require('./index'); // alexa-top-sites

// Get the first 10 pages (250 results) of http://www.alexa.com/topsites/category/Top/Computers/Internet
getPages(byCategory, 'Computers/Internet', 10)
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.error(err.message));

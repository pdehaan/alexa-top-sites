const { getPages, byCategory } = require('../index'); // alexa-top-sites

// Get the first 2 pages (50 results) of http://www.alexa.com/topsites/category/Top/Computers/Internet
getPages(byCategory, 'Computers/Internet', 2)
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.error(err.message));

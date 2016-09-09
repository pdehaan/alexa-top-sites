const { byCategory } = require('./index'); // alexa-top-sites

// Get the third (zero-indexed) page of http://www.alexa.com/topsites/category;2/Top/Sports
byCategory('Sports', 2)
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.error(err.message));

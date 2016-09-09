const { getPages, byCategory } = require('./index'); // alexa-top-sites

getPages(byCategory, 'Computers/Internet', 10)
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.error(err.message));
